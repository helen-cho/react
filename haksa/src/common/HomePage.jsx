import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import Chart3 from './Chart3'
import FinancePage from '../components/crawl/FinancePage'

const HomePage = () => {
  return (
    <div>
      <h1 className='text-center'>홈페이지</h1>
      <Row>
        <Col>
          <FinancePage/>
        </Col>
        <Col>
          <Chart1/>
        </Col>
        <Col>
          <Chart3/>
        </Col>
      </Row>
      <Chart2/>  
    </div>
  )
}

export default HomePage