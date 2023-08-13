import React from 'react'
import './styles/About.css'
import image from '../assets/powerlogo.png'

export default function About() {
  return (
    <div className='container'>
        <div className='left'> <div className='title'>About us / Benefits</div>
            <div className='desc' style={{color:'darkgray', fontSize:'20px'}}>
            We are strong believers of sustainable
            transportation, <br />
            our aim as a company is <br />
            to provide people like you with accessible
            and <br /> easy to use bicycle rides that come with
            benefits for both <br />
            you <b style={{color:'white'}}>AND</b>  the environment.
            </div>    
        </div>
        <div className='center-image'>
            <img width={250} height={250}  src={image} alt="logo" />
        </div>
        <div className='right'>
        <div style={{minHeight:'200px',background:"#4D3E72", padding:'20px', borderRadius:'20px'}}>
        Minimizes pollution
        produces zero emissions
        <div style={{marginTop:'30px'}}>
        <p>Rewards such as:</p>
        <p>Free rides</p>
        <p>Discounts and More!</p>
        </div>
        </div>
        </div>

        
    </div>
  )
}
