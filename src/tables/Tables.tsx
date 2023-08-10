import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        color: theme.palette.common.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    '&.idColumn': {
        backgroundColor: 'red',
    },
    '&.idColumn1': {
        backgroundColor: 'black',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const sxContainer = {
    overflowX: 'auto',
    width: '98%',
    minWidth: 500,
    display: 'flex',
    margin: '2rem auto',
    justifyContent: 'center',
};

const sxTable = {
    minWidth: 500,
    width: '100%',
};

interface RowData1 {
    id: number;
    samstag: string;
    sonntag: string;
    feiertag: string;
    createdAt: Date;
}

function createData1(
    id: number,
    samstag: string,
    sonntag: string,
    feiertag: string,
    createdAt?: Date
): RowData1 {
    return { id, samstag, sonntag, feiertag, createdAt: createdAt || new Date() };
}

interface RowData2 {
    id: number;
    samstag: string;
    sonntag: string;
    feiertag: string;
}

function createData2(
    id: number,
    samstag: string,
    sonntag: string,
    feiertag: string,
): RowData2 {
    return { id, samstag, sonntag, feiertag };
}

export const Tables = () => {
    const createInitialRowsTable1 = (length: number, includeDate: boolean) =>
        Array.from({ length }, (_, index) =>
            includeDate ? createData1(index, '', '', '', new Date()) : createData1(index, '', '', '', undefined)
        );

    const useLocalStorageStateTable1 = (key: string, initialRows: RowData1[]) => {
        const storedRows = localStorage.getItem(key);
        const initialData = storedRows ? JSON.parse(storedRows) : initialRows;
        const [data, setData] = React.useState<RowData1[]>(initialData);

        React.useEffect(() => {
            localStorage.setItem(key, JSON.stringify(data));
        }, [data]);

        return [data, setData] as const;
    };

    const [rows1, setRows1] = useLocalStorageStateTable1('tableRows1', createInitialRowsTable1(11, true));

    const handleInputChange1 = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        id: number,
        column: keyof RowData1
    ) => {
        const { value } = e.target;
        setRows1((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, [column]: value } : row)));
    };

    // const formatDate1 = (date: Date) => date.toLocaleDateString();
    /* 
        React.useEffect(() => {
            // Set up a function to check and clear inputs on Sunday midnight
            const deleteExpiredInputs = setInterval(() => {
                const currentDate = new Date();
    
                // Check if it's Sunday and time is 00:00 (midnight)
                if (currentDate.getDay() === 0 && currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
                    setRows1((prevRows) =>
                        prevRows.map((row) => {
                            return { ...row, samstag: '', sonntag: '' };
                        })
                    );
                    setRows2((prevRows) =>
                        prevRows.map((row,) => {
                            return { ...row, samstag: '', sonntag: '' };
                        })
                    );
                }
            }, 60000); // Check every minute, you can adjust the interval as needed
    
            // Clean up the interval when the component unmounts
            return () => {
                clearInterval(deleteExpiredInputs);
            };
        }, []); // Run this effect only once on component mount
     */
    const formatDate1 = (date: Date) => date.toLocaleDateString();

    React.useEffect(() => {
        const currentDate = new Date();
        const saturday = new Date(currentDate);
        saturday.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // Get the next Saturday
        const sunday = new Date(currentDate);
        sunday.setDate(currentDate.getDate() + (7 - currentDate.getDay())); // Get the next Sunday

        const formattedSaturday = formatDate1(saturday); // Format Saturday date as string
        const formattedSunday = formatDate1(sunday); // Format Sunday date as string

        setRows1((prevRows) =>
            prevRows.map((row, index) => {
                if (index === 0) {
                    // Update the 0th row
                    return {
                        ...row,
                        samstag: formattedSaturday,
                        sonntag: formattedSunday,
                    };
                }
                return row;
            })
        );
        const deleteExpiredInputs = setInterval(() => {
            const currentDate = new Date();

            // Check if it's Sunday and time is 00:00
            if (currentDate.getDay() === 2 && currentDate.getHours() === 11 && currentDate.getMinutes() === 0) {
                setRows1((prevRows) =>
                    prevRows.map((row) => {
                        return { ...row, samstag: '', sonntag: '' };
                    })
                );
            }
        }, 60000); // Check every minute, you can adjust the interval as needed

        return () => {
            clearInterval(deleteExpiredInputs);
        };
    }, []);


    const createInitialRowsTable2 = (length: number) =>
        Array.from({ length }, (_, index) =>
            createData2(index, '', '', '')
        );

    const useLocalStorageStateTable2 = (key: string, initialRows: RowData2[]) => {
        const storedRows = localStorage.getItem(key);
        const initialData = storedRows ? JSON.parse(storedRows) : initialRows;
        const [data, setData] = React.useState<RowData2[]>(initialData);

        React.useEffect(() => {
            localStorage.setItem(key, JSON.stringify(data));
        }, [data]);

        return [data, setData] as const;
    };

    const [rows2, setRows2] = useLocalStorageStateTable2('tableRows2', createInitialRowsTable2(11));

    const handleInputChange2 = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        id: number,
        column: keyof RowData1
    ) => {
        const { value } = e.target;
        setRows2((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, [column]: value } : row)));
    };

    return (
        <div>
            <TableContainer component={Paper} sx={sxContainer}>
                <Table sx={sxTable} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className="idColumn" style={{ width: '10px', textAlign: 'center' }} />
                            <StyledTableCell align="left" style={{ width: '1000px', textAlign: 'center' }}>
                                Samstag
                            </StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '1000px', textAlign: 'center' }}>
                                Sonntag
                            </StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '1000px', textAlign: 'center' }}>
                                Feiertag
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows1.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell className="idColumn1" component="th" scope="row" style={{ textAlign: 'center' }}>
                                    {index === 0 ? 'Aktuelles Datum' : index}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <textarea
                                        value={row.samstag}
                                        onChange={(e) => handleInputChange1(e, row.id, 'samstag')}
                                        style={{
                                            width: '100%',
                                            height: index === 0 ? '26px' : '60px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            resize: 'vertical',
                                            fontSize: '14px',
                                            fontFamily: index === 0 ? 'Arial' : 'Arial', // Change the font family based on the index
                                            fontWeight: index === 0 ? 'bold' : 'normal', // Make the font bold for the first row, normal for others
                                            display: 'flex', // Use flex display
                                            alignItems: 'center', // Vertically align the text in the center
                                            textAlign: index === 0 ? 'center' : 'left', // Horizontally center the text for the first row, left align for others
                                        }}
                                    />

                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <textarea
                                        value={row.sonntag}
                                        onChange={(e) => handleInputChange1(e, row.id, 'sonntag')}
                                        style={{
                                            width: '100%',
                                            height: index === 0 ? '26px' : '60px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            resize: 'vertical',
                                            fontSize: '14px',
                                            fontFamily: index === 0 ? 'Arial' : 'Arial', // Change the font family based on the index
                                            fontWeight: index === 0 ? 'bold' : 'normal', // Make the font bold for the first row, normal for others
                                            textAlign: index === 0 ? 'center' : 'left', // Horizontally center the text for the first row, left align for others
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <textarea
                                        value={row.feiertag}
                                        onChange={(e) => handleInputChange1(e, row.id, 'feiertag')}
                                        style={{
                                            width: '100%',
                                            height: index === 0 ? '26px' : '60px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            resize: 'vertical',
                                            fontSize: '14px',
                                            fontFamily: index === 0 ? 'Arial' : 'Arial', // Change the font family based on the index
                                            fontWeight: index === 0 ? 'bold' : 'normal', // Make the font bold for the first row, normal for others
                                            textAlign: index === 0 ? 'center' : 'left', // Horizontally center the text for the first row, left align for others
                                        }}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                    <img
                        src="https://media.tenor.com/RM-6VCn25fIAAAAC/tea-theboythatwas.gif"
                        alt="GIF"
                        style={{ height: '10rem' }}
                    />
                </div>
                <p style={{ fontSize: '1.5rem', marginRight: '1rem', marginLeft: '1rem', background: 'yellow', color: 'black', fontWeight: 'bold', borderRadius: '5%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontStyle: 'gerade',
                            fontSize: '30px',
                            color: 'white',
                            textShadow: '2px 2px 10px blue',
                            padding: '1px 10px',
                            width: '95px',
                            height: '50px',
                        }}
                    >
                        Note:
                    </div>
                    Zum Editieren einfach in eine Zelle klicken & Text eintragen.
                    Diese Website ist ein Geschenk an die Familie Notfall.
                </p>


            </div>



            <TableContainer component={Paper} sx={sxContainer}>
                <Table sx={sxTable} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className="idColumn" style={{ width: '10px', textAlign: 'center' }} />
                            <StyledTableCell align="left" style={{ width: '1000px', textAlign: 'center' }}>
                                Weihnachten, Silvester, Neujahr (Frühdienst)
                            </StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '1000px', textAlign: 'center' }}>
                                Weihnachten, Silvester, Neujahr (Spätdienst)
                            </StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '1000px', textAlign: 'center' }}>
                                Weihnachten, Silvester, Neujahr (Nachtdienst)
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows2.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell className="idColumn1" component="th" scope="row" style={{ textAlign: 'center' }}>
                                    {index === 0 ? 'Aktuelles Datum' : index}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <textarea
                                        value={row.samstag}
                                        onChange={(e) => handleInputChange2(e, row.id, 'samstag')}
                                        style={{
                                            width: '100%',
                                            height: index === 0 ? '26px' : '60px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            resize: 'vertical',
                                            fontSize: '14px',
                                            fontFamily: index === 0 ? 'Arial' : 'Arial', // Change the font family based on the index
                                            fontWeight: index === 0 ? 'bold' : 'normal', // Make the font bold for the first row, normal for others
                                            textAlign: index === 0 ? 'center' : 'left', // Horizontally center the text for the first row, left align for others
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <textarea
                                        value={row.sonntag}
                                        onChange={(e) => handleInputChange2(e, row.id, 'sonntag')}
                                        style={{
                                            width: '100%',
                                            height: index === 0 ? '26px' : '60px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            resize: 'vertical',
                                            fontSize: '14px',
                                            fontFamily: index === 0 ? 'Arial' : 'Arial', // Change the font family based on the index
                                            fontWeight: index === 0 ? 'bold' : 'normal', // Make the font bold for the first row, normal for others
                                            textAlign: index === 0 ? 'center' : 'left', // Horizontally center the text for the first row, left align for others
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <textarea
                                        value={row.feiertag}
                                        onChange={(e) => handleInputChange2(e, row.id, 'feiertag')}
                                        style={{
                                            width: '100%',
                                            height: index === 0 ? '26px' : '60px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            resize: 'vertical',
                                            fontSize: '14px',
                                            fontFamily: index === 0 ? 'Arial' : 'Arial', // Change the font family based on the index
                                            fontWeight: index === 0 ? 'bold' : 'normal', // Make the font bold for the first row, normal for others
                                            textAlign: index === 0 ? 'center' : 'left', // Horizontally center the text for the first row, left align for others
                                        }}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
