import React from 'react';
import SubHeader from 'app/components/layout/Header/SubHeader';

const withContainer = (configContainer: any) => (BaseComponent: any) => (
  props: any
) => {
  const {
    title,
    subTitle,
    breadcrumb,
    onSave,
    onSubmit,
    isLoading,
    buttonAdd,
    onAdd,
    onBlock,
    isBlock,
    blockButton,
    unLockButton,
    id,
    onViewSource,
    isViewSource,
    buttonViewSource,
    isCard,
    tabTitle,
    isTitle,
    titleMarginTop,
    onDelete,
    deleteButton,
  } = configContainer(props);

  return (
    <div className="bg-white flex flex-col">
      <SubHeader
        deleteButton={deleteButton}
        onDelete={onDelete}
        titleMarginTop={titleMarginTop}
        isTitle={isTitle}
        tabTitle={tabTitle}
        isCard={isCard}
        title={title}
        subTitle={subTitle}
        breadcrumb={breadcrumb}
        onSave={onSave}
        onSubmit={onSubmit}
        isLoading={isLoading}
        onAdd={onAdd}
        buttonAdd={buttonAdd}
        onBlock={onBlock}
        isBlock={isBlock}
        blockButton={blockButton}
        unLockButton={unLockButton}
        id={id}
        onViewSource={onViewSource}
        isViewSource={isViewSource}
        buttonViewSource={buttonViewSource}
      />
      <BaseComponent {...props} />
    </div>
  );
};

export default withContainer;
