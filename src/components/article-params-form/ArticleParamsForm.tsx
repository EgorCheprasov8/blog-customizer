import { clsx } from 'clsx';
import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
      <aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
