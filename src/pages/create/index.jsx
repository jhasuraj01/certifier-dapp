import './styles.scss';
import { SideNav } from '../../component/SideNav';
import {ReactComponent as VerifiedIcon} from '../../assets/verified.svg'
import { useEffect, useRef, useState } from 'react';
import web3 from '../../web3/proxy';

export function CreatePage() {
    const [certificates, setCertificates] = useState([])

    const title = useRef(null)
    const name = useRef(null)
    const issuedTo = useRef(null)
    const expireAt = useRef(null)
    const createdAt = useRef(null)
    const description = useRef(null)

    const onConnect = async () => {
        const account = await web3.getAccount()
        const certificates = await web3.getCertificateByIssuer(account.address)
        setCertificates(certificates.reverse())
    }

    const handleCreate = async () => {
        const certificate = await web3.createCertificate({
            issuedTo: issuedTo.current.value,
            expireAt: expireAt.current.value,
            createdAt: createdAt.current.value,
            title: title.current.value,
            name: name.current.value,
            description: description.current.innerText
        })
        setCertificates([certificate, ...certificates])
    }

    return (
        <div className='create-page'>
            {/* Sidenav */}
            <SideNav verify={true} connectedCallback={onConnect}/>

            {/* Certificate editor */}
            <div className='editor'>
                    <div className="form">
                        <h3>Create Certificate</h3>
                        <label className="input-box">
                            <span className="details">Title</span>
                            <input ref={title} type="text" placeholder="Enter Title"/>
                        </label>
                        <label className="input-box">
                            <span className="details">Name</span>
                            <input ref={name} type="text" placeholder="Enter your Name"  />
                        </label>
                        <label className="input-box">
                            <span className="details">Issued To</span>
                            <input ref={issuedTo} type="text" placeholder="Enter Ethereum Account Public Key"  />
                        </label>
                        <label className="input-box">
                            <span className="details">Issued Date</span>
                            <input ref={createdAt} type="date" placeholder="DD-MM-YYYY"  />
                        </label>
                        <label className="input-box">
                            <span className="details">Expiry Date</span>
                            <input ref={expireAt} type="date" placeholder="DD-MM-YYYY"  />
                        </label>
                        <label className="input-box">
                            <span className="details">Description</span>
                            <div ref={description} className='des-container' placeholder="Enter Description" contentEditable/>
                        </label>
                        <button onClick={handleCreate}>Submit</button>
                    </div>
            </div>

            {/* Certificate preview */}
            <div className='certificate-card preview'>
                <h2 className='card header'>Certificates Issued By Me</h2>
                {certificates.map(c =>
                    <div className='card' key={c.id}>
                        <div className='card1'>
                            <div className='title'>Title: {c.data.title}</div>
                            <div className='cid'>Certificate ID: {c.id}</div>
                        <div className='Iby'>Issued By: {c.issuedBy}</div>
                        <div className='Ito'>Issued to: {c.issuedTo}</div>
                        </div>
                        <div className='vicon'><VerifiedIcon/></div>
                    </div>
                )}

            </div>
        </div>
    )
}