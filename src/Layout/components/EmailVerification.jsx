import React, { useState } from "react";

import Container from "../../Components/Container";
import Button from "../../Components/Button";

import { sendEmailVerificationEvent } from '../../data/sendEmailVerification';

const EmailVerification = ({ currentUser }) => {
    const [loading, setLoading] = useState(false);
    
    const sendEmailVerification = async () => {
        setLoading(true);

        await sendEmailVerificationEvent(currentUser);

        setLoading(false);
    }

    return (
        <Container className="home-section mb-3">
            <div
                className="home-box"
                style={{            
                    width: '100%',
                    minHeight: '160px',
                    backgroundColor: '#d45659',
                    boxSizing: 'border-box',
                    backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/021/454/514/non_2x/email-confirmation-app-icon-email-icon-free-png.png)',
                    backgroundPosition: '95% -50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '145px'
                }}
            >
                <div className="home-container p-3" style={{ width: '75%' }}>
                    <div>
                        <h4>
                            Verifikasikan Email anda!
                            <br />
                            <small>dan menggunakan semua feature kami!</small>
                        </h4>
                        <Button
                            className="w-75 btn btn-warning"
                            style={{ padding: '8px 16px' }}
                            onClick={sendEmailVerification}
                            label={loading? (
                                    <>
                                        <i className="fas fa-sync-alt fa-spin" />
                                        {' '}
                                        Memperoses...
                                    </>
                                ) : 'Kirim Email'
                            }
                            buttonIcon={loading && "fas fa-sync-alt fa-spin"}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EmailVerification;