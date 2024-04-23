import { useEffect, useState } from 'react';
import { Create, getList } from '../../../services/admin.category.services';
import ReactPaginate from 'react-paginate';

function Dashboard() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [pageCount, setPageCount] = useState(0);
    const [cates, setCates] = useState([]);
    const [cateName, setCateName] = useState('');
    const [created_at, setCreatedAt] = useState();
    let stt = 1;
    useEffect(() => {
        async function loadData() {
            try {
                let items = await getList({
                    pageIndex: page,
                    pageSize: pageSize,
                });
                setCates(items.data);
                setPageCount(Math.ceil(items.totalItems / pageSize));
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
    }, [page, pageSize]);
    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    async function handleCreate() {
        let result = await Create({
            cate_name: cateName,
        });

        if (result.status === 200) {
            alert('Thêm thành công!');
        }
    }
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h1>Danh sách loại sản phẩm</h1>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr className="table table-striped table-hover">
                                <th scope="col">STT</th>
                                <th scope="col">Tên loại sản phẩm</th>
                                <th scope="col">Ngày tạo</th>
                                <th scope="col">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cates.map((cate: any) => {
                                return (
                                    <tr key={cate['id']}>
                                        <th scope="row">{stt++}</th>
                                        <td>{cate['cate_name']}</td>
                                        <td>{cate['created_at'].slice(0, 10)}</td>
                                        <td>
                                            <div
                                                className="form-group"
                                                style={{ display: 'flex', justifyContent: 'space-between' }}
                                            >
                                                <button
                                                    className="btn-primary btn"
                                                    style={{ width: '30%', margin: '0 auto' }}
                                                >
                                                    Detail
                                                </button>
                                                <button
                                                    className="btn btn-warning"
                                                    style={{ width: '30%', margin: '0 auto' }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr></tr>
                        </tbody>
                    </table>
                    <section className="page">
                        <select
                            name="pageSize"
                            className="form-control"
                            onChange={(e) => changeInputValue(e)}
                            value={pageSize}
                        >
                            <option value="5">6</option>
                            <option value="10">12</option>
                            <option value="15">18</option>
                            <option value="20">24</option>
                        </select>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel={<i className="fa-solid fa-angle-left"></i>}
                            renderOnZeroPageCount={null}
                        />
                    </section>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h1>Thêm loại sản phẩm</h1>
                </div>

                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="cate_id">Têb loại sản phẩm</label>
                            <input
                                name="cate_name"
                                id="cate_name"
                                className="form-control"
                                onChange={(e: any) => setCateName(e.target.value)}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="created_at" onChange={(e: any) => setCreatedAt(e.target.value)}>
                                Ngày tạo
                            </label>
                            <input type="date" className="form-control" name="created_at" id="created_at" />
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                style={{ width: '30%', marginLeft: '35%', padding: '10px 0px' }}
                                name="cmd"
                                className="btn btn-primary"
                                onClick={handleCreate}
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
