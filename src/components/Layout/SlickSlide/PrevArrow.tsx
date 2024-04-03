function PrevArrow(props: any) {
    const { onClick } = props;

    return (
        <button className={'slick-arrow slick-prev'} onClick={onClick}>
            <i className="fa-solid fa-angle-left"></i>
        </button>
    );
}
export default PrevArrow;