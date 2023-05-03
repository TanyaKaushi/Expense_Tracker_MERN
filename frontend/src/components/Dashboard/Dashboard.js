import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/icons.js';
import Chart from '../Chart/Chart';
import html2Canvas from 'html2canvas';
import jspdf from 'jspdf';

import { plus } from '../../utils/icons.js';
import Button from '../Button/Button';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    const pdfRef = useRef();

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2Canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('expense.pdf');

        })
    }

    return (
        <DashboardStyled className='main' >
            <InnerLayout ref={pdfRef}>
                <h2>All Transactions</h2>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con" >
                            <div className="income">
                                <h3>Total Income</h3>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h3>Total Expense</h3>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                        

                    </div>
                </div>
            </InnerLayout>

            <br />
                        <div style={{ marginLeft: "800px" }}>
                            <Button
                                name={'Download Sheet'}
                                icon={plus}
                                bPad={'.8rem 1.6rem'}
                                bRad={'30px'}
                                bg={'var(--color-accent'}
                                color={'#fff'}
                                onClick={downloadPDF}
                            />
                        </div>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`

    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 1rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 1.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    margin-top: -1rem;
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 01rem;
                span{
                    font-size: 1.2rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default Dashboard