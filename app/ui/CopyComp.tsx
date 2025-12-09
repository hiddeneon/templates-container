'use client';

import { Direction } from 'radix-ui';
import { useCopyToClipboard } from 'usehooks-ts';
import { Symbol } from '../data/types';

interface SymbolsWrapperProps {
  symbols: Symbol[];
}


export default function CopyComp({ symbols }: SymbolsWrapperProps) {
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
        {symbols.map((el) => <button key={el.id} onClick={handleCopy(el.symbol)} className='sidebar-copy-element'>{el.symbol}</button>)}
      </div>
    </>
  )
}