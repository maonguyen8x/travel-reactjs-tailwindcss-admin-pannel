import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { IProps } from './type';

const Tabs = (props: IProps) => {
  const { routes = [] } = props;
  const match: any = useRouteMatch();

  const tabIndex = match?.params?.path;
  const history = useHistory();

  function handleClick(path: string) {
    history.push(path);
  }

  return (
    <div className="relative">
      <div className="bg-blue-100 border-0">
        {routes?.map((route: any, index: string) => {
          if (!route) return null;
          const active = route.key?.find((item: string) =>
            item.includes(tabIndex)
          );
          return (
            <button
              key={index}
              disabled={!route?.path}
              onClick={() => {
                handleClick(route?.path);
              }}
              className={`px-12 py-3 uppercase font-medium text-xl ${
                active
                  ? 'bg-tab-active text-white'
                  : 'bg-transparent text-default border-r border-gray-200 border-sloid'
              } ${!route?.path ? 'text-gray-400' : ''}`}
            >
              {route.title}
            </button>
          );
        })}
      </div>

      <div className="p-10 bg-white">{props.children}</div>
    </div>
  );
};
export default Tabs;
