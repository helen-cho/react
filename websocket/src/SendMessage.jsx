import { Stomp } from '@stomp/stompjs';
import React, {useEffect, useRef, useState} from 'react'
import "./ChatPage.css"
import { Row, Col, Card, Form } from 'react-bootstrap';

const SendMessage = () => {
  const [messages, setMassages] = useState([]);
  const [form, setForm] = useState({
    sender:'',
    contents:''
  });
  const {sender, contents} = form;
  const onChangeForm = (e) =>{
    setForm({...form, [e.target.name]:e.target.value});
  }

  useEffect(()=>{
    connect();
    //컴포너트 언마운트시 웹소켓 연결 해제
    return ()=> disconnect();
  },[]);

  const stompClient = useRef(null);
  const connect = () => {
    stompClient.current = Stomp.over(()=>{
      return new WebSocket("http://localhost:8080/ws");
    });
    stompClient.current.connect({}, ()=>{
      stompClient.current.subscribe('/sub/chat', (message)=>{
        const newMessage = JSON.parse(message.body);
        setMassages((messages)=>[...messages, newMessage])
      });
    });
  }
  
  const disconnect = () => {
    if(stompClient.current){
      stompClient.current.disconnect();
    }
  }

  const onSendMessage = (e) => {
    e.preventDefault();
    console.log(form)
    if(contents === "") {
      alert("보내실 내용을 입력하세요!");
      return;
    }
    if(stompClient.current && contents){
      stompClient.current.send("/pub/message", {}, JSON.stringify(form));
      //데이터베이스에저장
    }
    setForm({...form, contents:''});
  }

  const messagesEndRef = useRef(null);
  useEffect(()=>{
    messagesEndRef.current.scrollIntoView({behavior:"smooth"});
  }, [messages]);

  return (
    <Row className='my-5 px-5 justify-content-center'>
      <Col md={6}>
        <input name="sender" value={sender} onChange={onChangeForm}/>
        <Card>
          <div className='wrap'>
            {messages.map((msg, index)=>
              <div key={index}>
                <div className={msg.sender===sender?'chat ch2':'chat ch1'}>
                  {msg.sender !== sender &&
                    <div className='icon'>
                      <img src="http://via.placeholder.com/50x50"/>
                      <div className='sender'>{msg.sender}</div>
                    </div>
                  }
                  <div className='textbox'>
                    <div>
                      {msg.contents}
                    </div>
                  </div>  
                </div>  
              </div>  
            )}
            <div ref={messagesEndRef}/>
          </div>
          <form onSubmit={onSendMessage}>
            <Form.Control style={{border:'none',outline:'none',padding:'10px',fontSize:'0.8rem',width:'100%'}}
              name="contents" value={contents} onChange={onChangeForm}
              placeholder='메시지입력'/>
          </form>
        </Card>
      </Col>
    </Row>
  )
}

export default SendMessage