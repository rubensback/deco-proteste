import React, { useCallback, useMemo, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { Box, TextField, Button } from '@material-ui/core';
import {
  Edit,
  ZoomIn,
  Visibility,
  VisibilityOff,
  DeleteOutline,
} from '@material-ui/icons/';

import { useConcelhos } from '../../../hooks/concelho';

const actionCellRenderer = ({ editAction, viewAction }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box display="flex" alignItems="center" marginRight={2}>
        <Edit onClick={editAction} style={{ cursor: 'pointer' }} />
      </Box>
      <Box display="flex" alignItems="center">
        <ZoomIn onClick={viewAction} style={{ cursor: 'pointer' }} />
      </Box>
    </Box>
  );
};

const activeCellRenderer = ({ active }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {active ? <Visibility /> : <VisibilityOff />}
    </Box>
  );
};

const Overview = ({ setConcelhoSelected, goToEdit, goToView }) => {
  const { concelhos, deleteConcelhos } = useConcelhos();
  const gridRef = useRef();

  const [rowData, setRowData] = useState(null);

  useMemo(() => {
    if (concelhos) {
      const data = concelhos.map(concelho => {
        const {
          id,
          name,
          distrito,
          acronym,
          initialZipcode,
          finalZipcode,
          active,
        } = concelho;

        return {
          id,
          name,
          distrito,
          acronym,
          initialZipcode,
          finalZipcode,
          active,
        };
      });

      setRowData(data);
    }
  }, [concelhos]);

  const onQuickFilterChanged = useCallback(value => {
    gridRef.current.api.setQuickFilter(value);
  }, []);

  const action = useCallback(
    (concelho, type) => {
      setConcelhoSelected(concelho);

      if (type === 'edit') goToEdit();
      else goToView();
    },
    [goToView, goToEdit, setConcelhoSelected],
  );

  const handleDelete = useCallback(async () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    await deleteConcelhos(selectedData);
  }, [deleteConcelhos]);

  const columnData = useMemo(
    () => [
      {
        headerName: 'ID',
        field: 'id',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: 'Actions',
        field: 'actions',
        cellRendererFramework: params =>
          actionCellRenderer({
            editAction: () => action(params.data, 'edit'),
            viewAction: () => action(params.data),
          }),
      },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Distrito', field: 'distrito' },
      { headerName: 'Acronym', field: 'acronym' },
      { headerName: 'Initial Zip Code', field: 'initialZipcode' },
      { headerName: 'Final Zip Code', field: 'finalZipcode' },
      {
        headerName: 'Active',
        field: 'active',
        cellStyle: { 'justify-content': 'flex-end' },
        cellRendererFramework: params =>
          activeCellRenderer({ active: params.data.active }),
      },
    ],
    [action],
  );

  return (
    <Box className="ag-theme-alpine">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          startIcon={<DeleteOutline style={{ color: 'red' }} />}
          onClick={handleDelete}
        >
          Remove Selected
        </Button>
        <TextField
          variant="outlined"
          onChange={e => onQuickFilterChanged(e.target.value)}
          placeholder="Pesquisa"
        />
      </Box>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnData}
        domLayout="autoHeight"
        defaultColDef={{
          sortable: true,
          flex: 1,
          minWidth: 100,
          resizable: true,
        }}
        componentWrappingElement="span"
        rowSelection="multiple"
        rowMultiSelectWithClick
      />
    </Box>
  );
};

export default Overview;
