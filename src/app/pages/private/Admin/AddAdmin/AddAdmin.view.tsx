import React, { useEffect, useState } from 'react';
import { BoxButton, BoxShadownCard } from 'app/components/layout/styled';
import { Col, Row } from 'reactstrap';
import TextInput from 'app/components/Form/TextInput';
import { getFieldProps } from 'app/utils';
import { COLORS, ROUTERS, SORT } from 'app/constants';
import SweetAlert from 'app/components/SweetAlert';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { formatTime } from 'app/utils';
import { t } from 'app/i18n';
import TooltipComponent from 'app/components/Tooltip';
import SelectInput from 'app/components/Form/SelectInput';
import { AvatarStyled, UserAvatar } from './styled';
import { IFilter } from './type';

const AddAdmin = (props: any) => {
  const [filterValue, setFilterValue] = useState();

  const {
    isLoading,
    handleSubmit,
    pages,
    fetching,
    getUserList,
    history,
    listUser,
    filter,
  } = props;
  const { limit, offset } = filter;

  const onGetListUser = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getUserList(customFilter);
  };

  useEffect(() => {
    onGetListUser(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListUser({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number) => {
    onGetListUser({
      limit: pageSize,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const handleBlockUser = () => {
    SweetAlert.confirm(
      t('admin.alert.confirm'),
      t('admin.alert.confirm.yes'),
      () => SweetAlert.success(t('admin.alert.success'))
    );
  };

  const onChangeSelect = (value: any) => {
    setFilterValue(value);
  };

  return (
    <Row>
      <Col md={12}>
        <BoxShadownCard>
          <br />
          <TextInput
            {...getFieldProps('country', props)}
            label={'Email'}
            as="Col"
            md={12}
          />
          <TextInput
            {...getFieldProps('city', props)}
            label={t('user.type')}
            as="Col"
            md={12}
            addon={
              <SelectInput
                value={filterValue}
                onChange={onChangeSelect}
                data={[]}
              />
            }
          />
          <Col md={12} className="mt-4 mb-4">
            <BoxButton
              background={COLORS.SUBMIT}
              disabled={isLoading}
              color="success"
              onClick={handleSubmit}
            >
              {isLoading ? 'Loading...' : 'Gửi'}
            </BoxButton>
          </Col>
          <Table
            isShowSearch={false}
            onSearch={onGetListUser}
            data={listUser}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            onSortedChange={(column: any, desc = true) => {
              onGetListUser({
                order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
              });
            }}
            columns={[
              {
                Header: 'Avatar',
                accessor: 'avatar',
                Cell: ({ row }: any) => {
                  const avatar = pathOr(
                    '',
                    ['original', 'profiles', 'avatars', 'mediaContent', 'url'],
                    row
                  );
                  return (
                    <UserAvatar>
                      <AvatarStyled src={avatar} alt="" />
                    </UserAvatar>
                  );
                },
              },
              {
                Header: t('APP.TABLE.USERNAME'),
                sortable: false,
                accessor: 'email',
                Cell: ({ row }: any) => pathOr('', ['original', 'name'], row),
              },
              {
                Header: t('APP.TABLE.EMAIL'),
                sortable: false,
                accessor: 'email',
                Cell: ({ row }: any) =>
                  pathOr('', ['original', 'email', 'email'], row),
              },
              {
                Header: 'Kiểu người dùng',
                sortable: false,
                accessor: 'type',
                Cell: ({ row }: any) => row?.original?.roles.toString(),
              },
              {
                Header: t('app.table.createdat'),
                accessor: 'createdAt',
                Cell: ({ row }: any) => {
                  const createdAt = row?.original?.createdAt;
                  const id = row?.original?.id;
                  return (
                    <TooltipComponent
                      id={`${id}createdAt`}
                      content={formatTime(createdAt)}
                      hoverTitle={t('location.filter')}
                      handlerFilter={() => ({})}
                    />
                  );
                },
              },
              {
                Header: (
                  <div className="flex w-full items-center justify-center">
                    {t('user.action')}
                  </div>
                ),
                sortable: false,
                accessor: 'action',
                width: 150,
                Cell: ({ row }: any) => {
                  const user = row?.original;
                  return (
                    <ButtonGroup
                      onDetail={() => onDetail(user.id)}
                      onDelete={handleBlockUser}
                    />
                  );
                },
              },
            ]}
            filter={filter}
            offset={offset}
            limit={limit}
            pages={pages}
            page={offset}
            pageSize={limit}
          />
        </BoxShadownCard>
      </Col>
    </Row>
  );
};

export default AddAdmin;
