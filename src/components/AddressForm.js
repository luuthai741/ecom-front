import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import adressApi from '../api/adressApi';
const AddressForm = ({ setAddress }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [detail, setDetail] = useState('');
    useEffect(() => {
        try {
            const fetchCities = async () => {
                const res = await adressApi.getCities();
                setCities(res.data)
            }
            fetchCities();
            setAddress("")
        } catch (error) {
            console.log(error);
        }
    }, [])

    const onChangeCity = async e => {
        setAddress("")
        const code = e.target.value;
        const { data } = await adressApi.getCityByCode(code);
        setCity(data);
        const city = await adressApi.getDistrictsByCityCode(code);
        setDistricts(city.data.districts);
    }

    const onChangeDistrict = async e => {
        const code = e.target.value;
        const { data } = await adressApi.getDistrictsByCode(code);
        setDistrict(data);

        const district = await adressApi.getWardsByCityCode(code);
        setWards(district.data.wards);

    }

    const onChangeWard = async e => {
        const code = e.target.value;
        const { data } = await adressApi.getWardByCode(code);
        setWard(data);
    }
    const onChangeAddress = e => {
        setDetail(e.target.value);

    }
    setAddress(`${detail} - ${ward.name} - ${district.name} - ${city.name}`)
    return (
        <div>
            <Form.Group className="mt-1" controlId='city'>
                <Form.Label>Tỉnh/Thành phố</Form.Label>
                <Form.Select required size="md" className="form-control" value={city.code} onChange={e => onChangeCity(e)}>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {
                        cities.map((city, index) => {
                            return (
                                <option key={index} value={city.code}>{city.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mt-1" controlId='district'>
                <Form.Label>Huyện</Form.Label>
                <Form.Select required size="md" className="form-control" value={district.code} onChange={e => onChangeDistrict(e)}>
                    <option value="">Chọn huyện</option>
                    {
                        districts.map((item, index) => {
                            return (
                                <option key={index} value={item.code}>{item.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mt-1" controlId='ward'>
                <Form.Label>Xã</Form.Label>
                <Form.Select required size="md" className="form-control" value={ward.code} onChange={e => onChangeWard(e)}>
                    <option value="">Chọn xã</option>
                    {
                        wards.map((item, index) => {
                            return (
                                <option key={index} value={item.code}>{item.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mt-1" controlId='country'>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Số nhà/ Đường'
                    value={detail}
                    required
                    onChange={(e) => onChangeAddress(e)}
                ></Form.Control>
            </Form.Group>
        </div>
    )
}

export default AddressForm;