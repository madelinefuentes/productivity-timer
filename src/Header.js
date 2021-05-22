import {Navbar, Row, Col, Modal, Container} from 'react-bootstrap';
import {useState} from 'react'
import Timer from './Timer'
import ls from 'local-storage'
import '../src/styling/Header.scss'

function Header() {
  const [showSettings, setShowSettings] = useState(false);
  const [focusTime, setFocusTime] = useState(ls.get('focusTime') || 25);
  const [breakTime, setBreakTime] = useState(ls.get('breakTime') || 5);
  const [autoStartBreak, setAutoStartBreak] = useState(false)

  function openSettings(){
    setShowSettings(true)
  }

  function closeSettings(){
    setShowSettings(false)
  }

  function updateFocusTime(e){
    setFocusTime(e.target.value)
    ls.set('focusTime', e.target.value)
  }

  function updateBreakTime(e){
    setBreakTime(e.target.value)
    ls.set('breakTime', e.target.value)
  }

  return (
    <div>
      <Row>
        <Navbar bg="light" variant="light">
          <Col md={{ span: 4, offset: 2 }} className="d-flex justify-content-center">
            <Navbar.Brand style={{ fontWeight: '300' }}> Productivity Timer</Navbar.Brand>
          </Col>
          <Col md={{ span: 4, offsetRight: 2 }} className="d-flex justify-content-center">
            <button onClick = {()=>openSettings()} style={{ color: "#555555" }} className="btn btn-small shadow-none">
              <i style={{ color: "#555555" }} className="fa fa-cog fa-lg"></i> settings</button>
          </Col>
        </Navbar>
      </Row>
      <Modal show={showSettings} onHide={closeSettings}>
        <Modal.Header closeButton>
          <Modal.Title style = {{color:'#bfbfbf'}}>Timer Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid" style = {{fontWeight: '700'}}>
          <Container fluid>
            <Row style = {{paddingTop: '10px'}}>
              <Col className = "align-items-center">
                <p style = {{color:'#555555', paddingRight:'40px'}}>Time (Minutes)</p>
              </Col>
              <Col>
                <label style = {{color: "#bfbfbf"}}>Pomodoro</label>
                <input onChange = {updateFocusTime} value = {focusTime} style={{width: "90px"}} length = "10" type = "number" className="form-control shadow-none"/>
              </Col>
              <Col>
                <label style = {{color: "#bfbfbf"}} >Break</label>
                <input onChange = {updateBreakTime} value = {breakTime} style={{width: "90px"}} length = "10" type = "number" className="form-control shadow-none"/>
              </Col>
            </Row>
            <Row style = {{paddingTop: '40px'}}>
              <Col>
                <p style = {{color:'#555555', paddingRight:'40px'}}>Auto Start Break</p>
              </Col>
              <Col>
                <div style= {{width:'70px'}} className='custom-control custom-switch'>
                  <input
                    type='checkbox'
                    className='custom-control-input shadow-none'
                    id='customSwitches'
                  />
                  <label className='custom-control-label' htmlFor='customSwitches'>
                  </label>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-secondary shadow-none" variant="secondary" onClick={closeSettings}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <Timer
        focusTime = {focusTime * 60}
        breakTime = {breakTime * 60}
      />
    </div>
  );
}
  
export default Header;