import SimplexNoise from './Noise'




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
        latlng: {
            latitude: latE,
            longitude: lngE,
        },
        description: 'Palestra',
    }
}

let Marker = []
const QUANTITY = 2

for (let i = 0; i < QUANTITY; i++) {
    Marker.push(singlePoint(i))
}

export default Marker
