import { FC, useEffect } from 'react';
import SideBar from './layout/SideBar';
import Content from './layout/Content';
import { useLayoutStore } from '@/store/layout';
import { useThemeStore } from '@/store/theme';
import { globalHotKeysRegister } from '@/utils/hotKeys';
import { useMedia } from 'react-use';
const App: FC = () => {
  const { toggleCollapse } = useLayoutStore((state) => state);
  const { theme, setTheme } = useThemeStore((state) => state);
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const themeStr = isDark ? 'dark' : 'light';
  // 监听系统主题和本地主题设置，自动更新
  useEffect(() => {
    if (theme === 'auto') {
      setTheme('auto');
    } else {
      themeStr === theme && setTheme(themeStr);
    }
    console.log('theme change');
  }, [isDark]);
  // 全局热键注册
  globalHotKeysRegister({
    win: [
      {
        keys: 'ctrl+b',
        callback: toggleCollapse,
      },
    ],
    mac: [
      {
        keys: 'meta+b',
        callback: toggleCollapse,
      },
    ],
  });
  return (
    <div className="flex relative h-[100vh] overflow-hidden">
      <SideBar />
      <Content />
    </div>
  );
};

export default App;
