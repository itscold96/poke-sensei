'use client';

import { motion, useDragControls } from 'framer-motion';
import MonsterBall from './MonsterBall';
import { useRef, useState } from 'react';
import SearchMenuContainer from './SearchMenuContainer';
import classNames from 'classnames';

export default function DraggableMenu() {
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  const menuContainer = useRef(null);

  const handleMenuDisplayClick = () => {
    // 드래그가 아니라 클릭이 일어날 경우에만 메뉴가 열리도록 분기 처리
    if (!isDragging) {
      setIsOpen(prevState => !prevState);
    }
  };

  return (
    <div className={'relative'}>
      <div ref={constraintsRef} className={'absolute h-[100dvh] w-[100dvw] -z-10'}>
        <SearchMenuContainer isOpenMenu={isOpen} onCloseMenuClick={handleMenuDisplayClick} />
        <motion.div
          ref={menuContainer}
          dragControls={dragControls}
          drag
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileDrag={{ cursor: 'grabbing' }}
          className={'absolute'}
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
          dragElastic={0.5}
          style={{ touchAction: 'none' }}
        >
          <div className={'flex gap-5'}>
            <article
              onClick={handleMenuDisplayClick}
              className={classNames('hover:cursor-pointer', isDragging && 'hover:cursor-grab')}
            >
              <MonsterBall />
            </article>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
