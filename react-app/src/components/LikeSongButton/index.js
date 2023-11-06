import iconHeart from '../../assets/heart.svg'
import { fetchLikes, likeSelector, addLike, deleteLike } from "../../store/like";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import heartfavred from '../../assets/heartfavred.png';
import heartfavblack from '../../assets/heartfavblack.png'
const LikeButton = ({songId}) => {

    const dispatch = useDispatch();


    const likes = useSelector(likeSelector)
    const getIsLike = () => likes && likes.includes(songId)
    const [isLike, setIsLike] = useState(getIsLike())

    useEffect(() => {
        setIsLike(getIsLike())
    },[likes])

    const likefunction = (e) => {
        e.stopPropagation();
        if( isLike) dispatch(deleteLike(songId))
        else dispatch(addLike(songId))

        setIsLike(!isLike)
    }
    const buttonStyle = {
        width: '25px',
        height: '10px',
        cursor: 'pointer'
      };

    return (

    <button style={buttonStyle} onClick={likefunction}>
    <img src={isLike ? heartfavred : heartfavblack} alt="Like Icon"  style={{ width: '13px', height: '13px' }} />
  </button>
    )
}
export default LikeButton
