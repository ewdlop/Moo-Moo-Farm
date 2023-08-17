import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

export const Cow = () => {
    const obj = useLoader(OBJLoader, '/Cow.obj')
    return <primitive object={obj} />
}