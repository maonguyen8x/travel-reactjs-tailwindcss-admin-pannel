export default function Breadcrunb({
  path,
  subPath,
  highlight,
  onPath,
  onSubPath,
}: {
  path: string;
  subPath?: string;
  highlight?: string;
  onPath?: any;
  onSubPath?: any;
}) {
  return (
    <div className="pl-2 flex flex-row items-center cursor-pointer">
      <h3
        className="text-2xl uppercase font-medium text-default mb-0"
        onClick={onPath}
      >
        {path}
      </h3>
      {subPath && (
        <div className="flex flex-row items-center justify-center">
          <i className="fas fa-angle-double-right text-gray-400 px-4" />
          <h3
            className="text-2xl uppercase font-medium text-default mb-0"
            onClick={onSubPath}
          >
            {subPath}
          </h3>
        </div>
      )}
      {highlight && (
        <div className="flex flex-row items-center justify-center">
          <i className="fas fa-angle-double-right text-gray-400 px-4" />
          <h3 className="text-2xl uppercase font-medium mb-0 text-yellow-500">
            #{highlight}
          </h3>
        </div>
      )}
    </div>
  );
}
