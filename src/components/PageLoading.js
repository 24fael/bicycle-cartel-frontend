import Lottie from "lottie-react";
import PageLoadingAnimation from '../assets/animations/pageLoadingAnimation.json'

export default function PageLoading(){
    const animation_style = {
        height: "95vh"
    }

    return(
        <Lottie animationData={PageLoadingAnimation} style={animation_style} loop={true} />
    )
}