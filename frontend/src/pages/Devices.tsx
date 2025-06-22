import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

interface Device {
    id: string;
    name: string | null;
    claimed: boolean;
    thresholdRed: number;
    thresholdYellow: number;
    thresholdGreen: number;
}

const Devices: React.FC = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState<Device[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        api
            .get<Device[]>('/device/list')
            .then((res) => setDevices(res.data))
            .catch(() => {
                setError('Unauthorized');
                navigate('/login');
            });
    }, [navigate]);

    return (
        <div>
            <h2>My Devices</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {devices.map((d) => (
                    <li key={d.id}>
                        {d.name ?? d.id} - thresholds: {d.thresholdRed}/{d.thresholdYellow}/
                        {d.thresholdGreen}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Devices;