import {Navbar, Row, Col, Modal, Container} from 'react-bootstrap';
import {useState} from 'react'
import Timer from './Timer'
import ls from 'local-storage'
import '../src/styling/Header.scss'

function Header() {
  const [showSettings, setShowSettings] = useState(false);
  const [focusTime, setFocusTime] = useState(ls.get('focusTime') || 25);
  const [breakTime, setBreakTime] = useState(ls.get('breakTime') || 5);
  const [autoStartBreak, setAutoStartBreak] = useState(ls.get('autoBreak') == 1 ? true : false);
  const [intervals, setIntervals] = useState(ls.get('intervals') || 0);

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

  function updateIntervals(e){
    setIntervals(e.target.value)
    ls.set('intervals', e.target.value)
  }

  function updateAutoBreak(){
    setAutoStartBreak(!autoStartBreak)
    let val = autoStartBreak ? 0 : 1;
    ls.set('autoBreak', val)
  }

  return (
    <>
      <Row>
        <Navbar bg="light" variant="light">
          <Col md={{ span: 4, offset: 2 }} className="d-flex justify-content-center">
            <Navbar.Brand style={{ fontWeight: '300' }}> Productivity Timer</Navbar.Brand>
          </Col>
          <Col md={{ span: 4, offsetRight: 2 }} className="d-flex justify-content-center">
            <button onClick = {()=>openSettings()} style={{ color: "#555555" }} className="btn btn-small shadow-none">
              <i style={{ color: "#555555" }} className="fa fa-cog fa-lg"></i><span className="d-none d-sm-inline"> settings</span></button>
          </Col>
        </Navbar>
      </Row>
      <Modal dialogClassName='modal-container' size = "sm" show={showSettings} onHide={closeSettings} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title style = {{color:'#bfbfbf'}}>Timer Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid" style = {{fontWeight: '700'}}>
          <Container>
            <Row className="align-items-center">
              <Col>
                <div>
                  <label style = {{color: "#555555"}}>Pomodoro</label>
                  <input onChange = {updateFocusTime} value = {focusTime} style={{width: "90px"}} length = "10" type = "number" className="form-control shadow-none"/>
                </div>
              </Col>
              <Col className = "d-flex justify-content-end">
                <div>
                  <label style = {{color: "#555555"}} >Break</label>
                  <input onChange = {updateBreakTime} value = {breakTime} style={{width: "90px"}} length = "10" type = "number" className="form-control shadow-none"/>
                </div>
              </Col>
            </Row>
            <Row style = {{marginTop: "20px"}} className="align-items-center border-top">
              <Col style = {{marginTop: "10px"}}>
                <div style = {{color:'#555555'}}>Auto Start Break</div>
              </Col>
              <Col className = "d-flex justify-content-end">
                <div className='custom-control custom-switch'>
                  <input
                    type='checkbox'
                    className='custom-control-input shadow-none'
                    id='customSwitches'
                    checked = {autoStartBreak}
                    onChange = {updateAutoBreak}
                  />
                  <label className='custom-control-label' htmlFor='customSwitches'>
                  </label>
                </div>
              </Col>
            </Row>
            <Row style = {{marginTop: "20px"}} className="align-items-center border-top">
              <Col style = {{marginTop: "10px"}}>
                <div style = {{color:'#555555'}}>Auto Start Intervals</div>
              </Col>
              <Col className = "d-flex justify-content-end">
                <input onChange = {updateIntervals} value = {intervals} style={{width: "70px"}} length = "2" type = "number" className="form-control shadow-none"/>
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
        autoStartBreak = {autoStartBreak}
        intervals = {intervals}
      />
    </>
  );
}
  
export default Header;