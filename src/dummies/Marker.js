import SimplexNoise from './Noise'

const logos = [
    require('../../assets/palestre/logo_1.jpg'),
    require('../../assets/palestre/logo_2.jpg'),
    require('../../assets/palestre/logo_3.jpg'),
    require('../../assets/palestre/logo_4.jpg'),
]



function singlePoint(i = 0) {
    let k = i
    if (k > 10) {
        k = i % 10
    }

    const latR = new SimplexNoise().noise(0, k) * 0.009
    const lngR = new SimplexNoise().noise(0, k) * 0.009

    let latE = 45.465317 + latR
    let lngE = 9.189441 + lngR

    return {
        id: i,
        title: 'Marker ' + i,
        logo: '',
        latlng: {
            latitude: latE,
            longitude: lngE,
        },
        description: 'Palestra',
    }
}

let Marker = []
const QUANTITY = 50

for (let i = 0; i < QUANTITY; i++) {
    Marker.push(singlePoint(i))
}

export default Marker
