'use client';

import { Direction } from 'radix-ui';
import { useCopyToClipboard } from 'usehooks-ts'

export default function CopyComp() {
  const [copiedText, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text })
      })
      .catch(error => {
        console.error('Failed to copy!', error)
      })
  }

  return (
    <>
      <div className='copy-elements-wrapper'>
        <button onClick={handleCopy('🔗')} className='sidebar-copy-element'>🔗</button>
        <button onClick={handleCopy('💳')} className='sidebar-copy-element'>💳</button>
        <button onClick={handleCopy('🏛️')} className='sidebar-copy-element'>🏛️</button>
        <button onClick={handleCopy('💶')} className='sidebar-copy-element'>💶</button>
        <button onClick={handleCopy('🗓️')} className='sidebar-copy-element'>🗓️</button>
        <button onClick={handleCopy('⚙️')} className='sidebar-copy-element'>⚙️</button>
        <button onClick={handleCopy('👆')} className='sidebar-copy-element'>👆</button>
        <button onClick={handleCopy('👇')} className='sidebar-copy-element'>👇</button>
        <button onClick={handleCopy('≫')} className='sidebar-copy-element'>≫</button>
        <button onClick={handleCopy('➜')} className='sidebar-copy-element'>➜</button>
        <button onClick={handleCopy('»')} className='sidebar-copy-element'>»</button>
        <button onClick={handleCopy('⌞⌝')} className='sidebar-copy-element'>⌞⌝</button>
        <button onClick={handleCopy('ℹ️')} className='sidebar-copy-element'>ℹ️</button>
        <button onClick={handleCopy('☑️')} className='sidebar-copy-element'>☑️</button>
        <button onClick={handleCopy('📃')} className='sidebar-copy-element'>📃</button>
        <button onClick={handleCopy('📎')} className='sidebar-copy-element'>📎</button>
        <button onClick={handleCopy('⚠️')} className='sidebar-copy-element'>⚠️</button>
        <button onClick={handleCopy('📱')} className='sidebar-copy-element'>📱</button>
        <button onClick={handleCopy('💻')} className='sidebar-copy-element'>💻</button>
        <button onClick={handleCopy('📞')} className='sidebar-copy-element'>📞</button>
        <button onClick={handleCopy('📧')} className='sidebar-copy-element'>📧</button>
      </div>
    </>
  )
}