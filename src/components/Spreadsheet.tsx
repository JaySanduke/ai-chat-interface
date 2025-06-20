'use client';

import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';

// import { useEffect, useRef, RefObject } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
registerAllModules();

import { HotTable } from '@handsontable/react-wrapper';

interface SpreadsheetProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | undefined;
}

export function Spreadsheet({ data }: SpreadsheetProps) {
  return (
    <div className="h-full w-full">
      <HotTable
        className='ht-theme-main-dark-auto'
        data={data}
        rowHeaders={true}
        colHeaders={data.length > 0 ? Object.keys(data[0]) : []}
        height="100%"
        licenseKey="non-commercial-and-evaluation"
        contextMenu={true}
        columnSorting={true}
        filters={true}
        dropdownMenu={true}
        stretchH='all'
        manualColumnResize={true}
        manualRowResize={true}
        autoWrapRow={true}
        autoWrapCol={true}
        minRows={30}
      />
    </div>
  );
}