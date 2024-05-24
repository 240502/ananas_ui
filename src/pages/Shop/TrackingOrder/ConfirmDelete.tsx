import React from 'react';
import '../../../assets/css/Admin/confirm_delete.css';
export const ConfirmDelete = ({ ...props }: any) => {
    return (
        <div
            id="modal-confirm-delete"
            className={props.displayConfirmationModal === true ? 'opened' : ''}
            onClick={props.hideConfirmationModal}
        >
            <div className="modal-confirm-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-confirm-header">
                    <h3>Thông báo</h3>
                    <div className="modal-confirm-close">
                        <i
                            className="fa-solid fa-xmark"
                            style={{ color: '#000000' }}
                            onClick={props.hideConfirmationModal}
                        />
                    </div>
                    <h4 className="modal-confirm-title">{props.deleteMessage}</h4>
                </div>
                <div className="modal-confirm-action">
                    <button type="button" className="btn btnNo" onClick={props.hideConfirmationModal}>
                        Hủy
                    </button>
                    <button
                        type="button"
                        className="btn btnYes"
                        onClick={() => {
                            props.handleCancel(props.id);
                        }}
                    >
                        Đồng ý
                    </button>
                </div>
            </div>
        </div>
    );
};
