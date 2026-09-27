import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isMenuOpen,
    rootRef,
    onChange: setIsMenuOpen,
  });

  const toggleMenu = (): void => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
      <aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
