export default function nextPhoto(ImageElement) {
    const currentphoto = ImageElement.current.src
    const index = product[0].images.indexOf(currentphoto)
    if (index === product[0].images.length - 1) {
        setCurrentImage(product[0].images[0])
    } else {
        setCurrentImage(product[0].images[index + 1])
    }
}
