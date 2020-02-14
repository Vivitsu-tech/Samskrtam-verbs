import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Col, Jumbotron } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Figure from 'react-bootstrap/Figure'
import Alert from 'react-bootstrap/Alert'
import Toast from 'react-bootstrap/Toast'

function AddVerbs() {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [root, setRoot] = useState('');
    const [voice, setVoice] = useState('kartari');
    const [tense, setTense] = useState('lat');
    const [peka, setPEka] = useState('');
    const [pdvi, setPDvi] = useState('');
    const [pbahu, setPBahu] = useState('');
    const [meka, setMEka] = useState('');
    const [mdvi, setMDvi] = useState('');
    const [mbahu, setMBahu] = useState('');
    const [ueka, setUEka] = useState('');
    const [udvi, setUDvi] = useState('');
    const [ubahu, setUBahu] = useState('');
    const [showmsg, setShowmsg] = useState(false);

    var Stat;

    var formdata = {
        root: String,
        voice: String,
        tense: String,
        purusha: String,
        eka: String,
        dvi: String,
        bahu: String
      };
    
      function initFormdata() {
        setRoot('');
        setVoice('kartari');
        setTense('lat');
        setPEka('');
        setPDvi('');
        setPBahu('');
        setMEka('');
        setMDvi('');
        setMBahu('');
        setUEka('');
        setUDvi('');
        setUBahu('');
    }

    function loadFormData() {
        formdata.root = root;
        formdata.voice = (voice == `kartari` ? 'kartari' :'karmani');
        formdata.tense = tense;
        if (formdata.purusha === 'prathama'){
            formdata.eka = peka;
            formdata.dvi = pdvi;
            formdata.bahu = pbahu;
        } else if (formdata.purusha === 'madhyama'){
            formdata.eka = meka;
            formdata.dvi = mdvi;
            formdata.bahu = mbahu;
        } else if (formdata.purusha === 'uttama'){
            formdata.eka = ueka;
            formdata.dvi = udvi;
            formdata.bahu = ubahu;
        } 
    }

    function postFormdata() {
         fetch('/lakaras', {
        method: 'post',
        body: JSON.stringify(formdata),
        headers: {
            'Content-Type': 'application/json'
        },
      })
      .then(res => {
        setShowmsg(true);
      })
      .then(data => console.log(data))
      .catch (error => console.log(error));
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const handleSubmit = event => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        
        formdata.purusha = '1prathama';
        loadFormData();
        postFormdata();

        formdata.purusha = '2madhyama';
        loadFormData();
        postFormdata();

        formdata.purusha = '3uttama';
        loadFormData();
        postFormdata();

        //initFormdata();
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
    };
  
    return (
        //<Jumbotron>
        
        <div className="center-div">
            <h4>Add new verb roots and its forms</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="formnone">
                    <Form.Label></Form.Label>
                    </Form.Group>
            
                    <Form.Group as={Col} md="2.75" controlId="formDhatu">
                    <Form.Label>धातुः/Verb Root</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        pattern="[a-zA-Z]+"
                        placeholder="Verb Root Ex: paT"
                        value={root}
                        onChange = {ref => setRoot(ref.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Enter the root in english using the 
                        <Button variant="link" size = "sm" onClick={handleShow}>
                            Transliteration
                        </Button>
                    </Form.Text>
                    <Modal show={show} onHide={handleClose} 
                        dialogClassName="modal-20w">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Devanagiri to English Transliteration
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Figure.Image
                        width={400}
                        height={400}
                        alt="Devanagiri_Transliteration_Table not found"
                        src={require('../Devanagiri_Transliteration_Table.png')}
                    />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                    </Modal>
                    <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
            
                    <Form.Group as={Col} md="2.75" controlId="formVoice">
                    <Form.Label>Voice</Form.Label>
                    <Form.Control as="select" value={voice}
                        onChange = {ref => setVoice(ref.target.value)}>
                    <option>kartari(Active voice)</option>
                    <option>karmani(Passive Voice)</option>
                    </Form.Control>
                    </Form.Group>
            

                    <Form.Group as={Col} md="2.75" controlId="formtense">
                    <Form.Label>Tense/lakAra</Form.Label>
                    <Form.Control as="select" value={tense}
                        onChange = {ref => setTense(ref.target.value)}>
                    <option>लट्(Present)</option>
                    <option>लोट्(command/benedict)</option>
                    <option>लङ्(Past)</option>
                    <option>लृट(Future)</option>
                    </Form.Control>
                    </Form.Group>                 
                </Form.Row>

                <Form.Row>
                    <Form.Label>
                        Please enter the verb forms in Devanagiri
                    </Form.Label>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="formpurusha1">
                    <Form.Label>पुरुषः/I-II-III person        </Form.Label>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="2.75" controlId="formEka">
                    <Form.Label>एक वचनम्(Singular)</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="formDvi">
                    <Form.Label>द्वि वचनम्(Dual)</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} md="2.75" controlId="formBahu">
                    <Form.Label>बहु वचनम्(Plural)</Form.Label>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="formprathama">
                    <Form.Label>प्रथमपुरुषः/III person</Form.Label>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="2.75" controlId="formprathamaEka">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="एक वचनम्"
                        value={peka}
                        onChange = {ref => setPEka(ref.target.value)}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="2.75" controlId="formprathamaDvi">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="द्वि वचनम्"
                        value={pdvi}
                        onChange = {ref => setPDvi(ref.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    
                    </Form.Group><Form.Group as={Col} md="2.75" controlId="formprathamaBahu">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="बहु वचनम्"
                        value={pbahu}
                        onChange = {ref => setPBahu(ref.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>

                    <Form.Group as={Col} md="2" controlId="formmadhyama">
                    <Form.Label>मध्यमपुरुषः/II person</Form.Label>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="2.75" controlId="formmadhyamaEka">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="एक वचनम्"
                        value={meka}
                        onChange = {ref => setMEka(ref.target.value)}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="2.75" controlId="formmadhyamaDvi">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="द्वि वचनम्"
                        value={mdvi}
                        onChange = {ref => setMDvi(ref.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    
                    </Form.Group><Form.Group as={Col} md="2.75" controlId="formmadhyamaBahu">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="बहु वचनम्"
                        value={mbahu}
                        onChange = {ref => setMBahu(ref.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>

                    <Form.Group as={Col} md="2" controlId="formuttama">
                    <Form.Label>उत्तमपुरुषः/I person</Form.Label>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="2.75" controlId="formuttamaEka">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="एक वचनम्"
                        value={ueka}
                        onChange = {ref => setUEka(ref.target.value)}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="2.75" controlId="formuttamaDvi">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="द्वि वचनम्"
                        value={udvi}
                        onChange = {ref => setUDvi(ref.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    
                    </Form.Group><Form.Group as={Col} md="2.75" controlId="formuttamaBahu">
                        <Form.Control
                        required
                        type="text"
                        pattern="[\u0900-\u097F]+"
                        placeholder="बहु वचनम्"
                        value={ubahu}
                        onChange = {ref => setUBahu(ref.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Submit form</Button>

                {/* <Alert variant="success" show = {showmsg} onClose={() => setShowmsg(false)} dismissible>
                    <p>Verb forms added suucessfully!</p>
                </Alert> */}
                <Toast show = {showmsg} onClose={() => {
                    setShowmsg(false)
                    initFormdata()
                }
                } 
                delay={3000} autohide
                style={{
                    position: 'absolute',
                    top: 200,
                    right:450,
                  }}
                >
                  <Toast.Header>
                        <strong className="mr-auto">Success!!</strong>
                  </Toast.Header>
                  <Toast.Body>Verb forms added successfully!</Toast.Body>
                </Toast>
            </Form>
       </div>
       //</Jumbotron>
    );
  }

export default AddVerbs;