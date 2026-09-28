import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  articleState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isMenuOpen,
    rootRef,
    onChange: setIsMenuOpen,
  });

  const toggleMenu = (): void => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const changeFormField =
    (field: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((state) => ({ ...state, [field]: option }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
      <aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={changeFormField('fontFamilyOption')}
          />
          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={changeFormField('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={changeFormField('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={changeFormField('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={changeFormField('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
