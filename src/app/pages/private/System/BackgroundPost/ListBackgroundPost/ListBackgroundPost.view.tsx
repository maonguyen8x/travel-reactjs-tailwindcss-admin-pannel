import React, { useState, useEffect } from 'react';
import { t } from 'app/i18n';
import Modal from 'app/components/Modal';
import SweetAlert from 'app/components/SweetAlert';
import ReactPaginate from 'app/components/Paginations';
import { isNull } from 'ramda-adjunct';
import { IProps } from './ListBackgroundPost.type';
import AddBackgroundPost from '../AddBackgroundPost/AddBackgroundPost.page';
import EditBackgroundPost from '../EditBackgroundPost/EditBackgroundPost.page';

const ListBackgroundPostView = ({
  pages,
  limit,
  offset,
  fetching,
  getListBackgroundPost,
  history,
  listBackgroundPost,
  deleteBackgroundPost,
}: IProps) => {
  const [state, setState] = useState({
    imageSelected: '',
    isShowModalZoom: false,
    isShowModalAdd: false,
    isShowModalEdit: false,
    getIdBackgroundPost: '',
  });

  const {
    imageSelected,
    isShowModalZoom,
    isShowModalAdd,
    isShowModalEdit,
    getIdBackgroundPost,
  } = state;

  const onClickDelete = (id: number) => {
    SweetAlert.confirm(
      'Do you want delete this Image?',
      'Yes, delete it!',
      () => deleteBackgroundPost(id)
    );
  };

  const onEditBackgroundPost = (id: any) => {
    setState({
      ...state,
      isShowModalEdit: true,
      getIdBackgroundPost: id,
    });
  };

  useEffect(() => {
    getListBackgroundPost(offset, limit);
  }, []);

  const onPageChange = (paging: { selected: number }) => {
    getListBackgroundPost(paging.selected);
  };

  const onOpenBackgroundPost = (dataSeleted: any) => {
    setState({
      ...state,
      isShowModalZoom: true,
      imageSelected: dataSeleted,
    });
  };

  const handleClick = (router: string, name?: string) => {
    history.push(router, name);
  };

  const dataBackgroundPost = listBackgroundPost.filter((item: any) =>
    isNull(item.deletedAt)
  );

  return (
    <div>
      <div className="flex flex-row items-center justify-end">
        <button
          className={
            'bg-green-500 py-3 px-10 text-white text-xl shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 '
          }
          onClick={() =>
            setState({ ...state, isShowModalAdd: !isShowModalAdd })
          }
        >
          {t('background_post.add')}
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6 mt-10">
        {dataBackgroundPost?.map((photo: any, index: any) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${photo?.backgroundPost?.url})` }}
            className="w-full aspect-ratio-1 bg-cover bg-center shadow cursor-pointer"
          >
            <div className="flex flex-1 items-center justify-between w-full h-full p-20 relative opacity-0 hover:opacity-100 transition-opacity duration-200 ease-in">
              <i
                className="fas fa-search zoom text-2xl text-white z-20"
                onClick={() => onOpenBackgroundPost(photo.backgroundPost.url)}
              />
              <i
                className="fas fa-trash remove text-2xl text-white  z-20"
                onClick={() => onClickDelete(photo.id)}
              />
              <i
                className="fas fa-edit edit text-2xl text-white  z-20"
                onClick={() => onEditBackgroundPost(photo?.id)}
              />

              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10" />
            </div>
          </div>
        ))}
      </div>
      <Modal
        isShowModal={isShowModalEdit}
        toggle={() =>
          setState({
            ...state,
            isShowModalEdit: !isShowModalEdit,
          })
        }
        body={<EditBackgroundPost id={getIdBackgroundPost} />}
      />
      <Modal
        isShowModal={isShowModalAdd}
        toggle={() =>
          setState({
            ...state,
            isShowModalAdd: !isShowModalAdd,
          })
        }
        body={<AddBackgroundPost />}
      />
      <Modal
        header={t('background_post.image')}
        isShowModal={isShowModalZoom}
        toggle={() =>
          setState({
            ...state,
            isShowModalZoom: !isShowModalZoom,
          })
        }
        body={<img src={imageSelected} alt="card-img" />}
      />
      <ReactPaginate
        onPageChange={onPageChange}
        pageCount={pages}
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName="break-me"
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        // onPageChange={this.handlePageClick}
        containerClassName="react-pagination"
        // subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default ListBackgroundPostView;
