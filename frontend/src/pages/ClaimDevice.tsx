import React, { useState } from 'react';
import api from '../api';

const ClaimDevice: React.FC = () => {
    const [deviceId, setDeviceId] = useState('');
    const [authKey, setAuthKey] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await api.post('/device/claim', { deviceId, authKey, name });
            setMessage(`Claimed: ${res.data.device.name}`);
        } catch (err) {
            setMessage('Failed to claim device');
        }
    };

    return (
        <div>
            <h2>Claim Device</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        placeholder="Device ID"
                    />
                </div>
                <div>
                    <input
                        value={authKey}
                        onChange={(e) => setAuthKey(e.target.value)}
                        placeholder="Auth Key"
                    />
                </div>
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Device Name"
                    />
                </div>
                <button type="submit">Claim</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ClaimDevice;