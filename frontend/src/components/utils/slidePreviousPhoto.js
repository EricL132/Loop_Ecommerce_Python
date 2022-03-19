export default function previousPhoto(ImageElement) {
    const currentphoto = ImageElement.current.src
    const index = product[0].images.indexOf(currentphoto)
    if (index === 0) {
        setCurrentImage(product[0].images[product.images.length - 1])
    } else {
        setCurrentImage(product[0].images[index - 1])
    }
}