function Dashboard() {
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h1>Thêm loại sản phẩm</h1>
                </div>
                <div className="card-body">
                    
                    <form
                    >
                        <div className="form-group" >
                            <label htmlFor="cate_id">Têb loại sản phẩm</label>
                            <input name="cate_name" id="cate_name" className="form-control"></input>
                        </div>
                     
                        <div className="form-group">
                            <label htmlFor="created_at">Ngày tạo</label>
                            <input type="date" className="form-control" name="created_at" id="created_at" />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                style={{ width: '30%', marginLeft: '35%', padding: '10px 0px' }}
                                name="cmd"
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
