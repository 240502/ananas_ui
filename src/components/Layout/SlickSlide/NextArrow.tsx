function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <button className={'slick-arrow slick-next'} onClick={onClick}>
            <i className="fa-solid fa-angle-right"></i>
        </button>
    );
}
export default NextArrow;