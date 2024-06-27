import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useRef, useState } from 'react';

const Detail = ({form, setForm, callAPI, good}) => {
  const [files, setFiles]= useState([]);

  const onClickSave = async() => {
    if(good.contents===form.contents) return;
    if(!window.confirm('상세정보를 저장하실래요?')) return;
    await axios.post('/goods/update/contents', 
          {gid:form.gid, contents:form.contents});
    alert("상세정보저장!");
    callAPI();
  }

  const onChangeFiles = (e) => {
    let selFiles=[]
    for(let i=0; i<e.target.files.length; i++){
      const file={
        name:URL.createObjectURL(e.target.files[i]),
        byte:e.target.files[i]
      }
      selFiles.push(file);
    }
    setFiles(selFiles);
  }

  const onClickAttach = async() => {
    if(files.length === 0) return;
    if(!window.confirm(`${files.length}개 파일을 업로드하실래요?`)) return;
    
    //첨부파일업로드
    const formData = new FormData();
    for(let i=0; i<files.length; i++){
      formData.append('bytes', files[i].byte);
    }
    await axios.post(`/goods/attach/${form.gid}`, formData);
    alert("첨부파일업로드!");
    setFiles([]);
  }

  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3">
    <Tab eventKey="home" title="상세정보">
      <div className='text-end mb-2'>
        <Button onClick={onClickSave}>상세정보저장</Button>
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={form.contents}
        onChange={(e, editor)=>setForm({...form, contents:editor.getData()})}/>
    </Tab>
    <Tab eventKey="profile" title="파일첨부하기">
      <InputGroup>
        <Form.Control onChange={onChangeFiles}
            type='file' multiple={true}/>
        <Button onClick={onClickAttach}>첨부파일저장</Button>
      </InputGroup>
      <Row className='my-5'>
        {files.map(file=>
          <Col key={file.name} xs={3}>
            <img src={file.name} width='100px'/>
          </Col>
        )}
      </Row>  
    </Tab>
    <Tab eventKey="attach" title="첨부한파일">

    </Tab>
  </Tabs>
  )
}

export default Detail