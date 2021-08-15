import { useEffect } from 'react'
import {useSelector} from 'react-redux'


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const useAuth = props => {
    const { currentUser } = useSelector(mapState)

    useEffect(()=>{
        if (!currentUser){
            props.history.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    return currentUser
}

export default useAuth;