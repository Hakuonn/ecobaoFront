import React,{ useState, useEffect } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import StoreKanBan from '../../components/StoreKanBan'
import Axios from '../../components/Axios'


function StoreIndex() {
  const [pic, setPic] = useState()
  const [name, setName] = useState()
  const [type, setType] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [address, setAddress] = useState()
  const [link_fb, setLink_fb] = useState()
  const [link_ig, setLink_ig] = useState()
  const [intro, setIntro] = useState()
  const [rating, setRating] = useState()

  const submitHandler = () =>{
    Axios().post('/store_data/change/', JSON.stringify({
      link_fb: link_fb,
      link_ig: link_ig,
      intro: intro,
    }))
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getToBack = () =>{
    Axios().get('/store_data/get/')
    .then((res)=>{
        if(res.status === 200){
            let data = res.data
            setName(data[0].name) 
            setType(data[0].type)
            setPhone(data[0].phone)
            setEmail(data[0].email)
            setAddress(data[0].address)
            setLink_fb(data[0].link_fb)
            setLink_ig(data[0].link_ig)
            setIntro(data[0].intro)
        }
    })
    .catch((err)=>{
        console.log(err)
    })

    Axios().get('/store_data/score')
    .then((res)=>{
      if(res.status === 200){
        let data = res.data
        console.log(data)
      }
    })
  }
  useEffect(()=>{
      getToBack()
  },[])
  return (
    <>
    <StoreKanBan/>
    <div className='storeIndex'>
      <Container fulid>
        <Row>
          <Col xs={12} sm={6} md={6}>
            <Image src={pic} alt={pic} rounded className='storeImg'/> 
          </Col>

          <Col xs={12} sm={6} md={6}>
              <h1>{name}</h1>
              <p>類型：{type}</p>
              <p>電話：{phone}</p>
              <p>Email：{email}</p>
              <p>地址：{address}</p>
            <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>放入您的商家實照</Form.Label>
              <Form.Control 
                             type="file" 
                             name='pic'
                             values={pic}
                             onChange={(e)=>setPic(e.target.value)}
                             accept=".jpg, .jpeg, .png, .gif"
                            />
            </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>FaceBook：</Form.Label>
                  <Form.Control type='url' placeholder='輸入您的fb網址' value={link_fb} onChange={(e)=>setLink_fb(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Instagram：</Form.Label>
                <Form.Control type='url' placeholder='輸入您的ig網址' value={link_ig} onChange={(e)=>{setLink_ig(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>商店簡介：</Form.Label>
                <Form.Control as="textarea" placeholder='輸入您的簡介' value={intro} onChange={(e)=>{setIntro(e.target.value)}}/>
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label>營業時段選擇：</Form.Label>
                <Form.Control as="textarea" placeholder='如何製作選擇營業時段呢？🤔'/>
              </Form.Group> */}
              <Button variant='success' type='button' className='storeIndexButton' onClick={()=>submitHandler()}>儲存</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default StoreIndex