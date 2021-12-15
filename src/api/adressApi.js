import axios from 'axios';
const adressApi = {
    getCities: () => {
        return axios.get(`https://provinces.open-api.vn/api/p`);
    },
    getCityByCode: code => {
        return axios.get(`https://provinces.open-api.vn/api/p/${code}`);
    },
    getDistrictsByCityCode: cityCode => {
        return axios.get(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
    },
    getDistrictsByCode: code => {
        return axios.get(`https://provinces.open-api.vn/api/d/${code}`);
    },
    getWardsByCityCode: districtCode => {
        return axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    },
    getWardByCode: code => {
        return axios.get(`https://provinces.open-api.vn/api/w/${code}`);
    }

}

export default adressApi;