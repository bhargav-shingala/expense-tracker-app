import React, { useContext, useEffect, useState } from "react";
import './style.css'
import HeaderImg from '../assets/header.png'
import { Link } from "react-router-dom";
import { Button } from "antd";
import TransactionForm from "../component/transactionModal";
import { FormContext } from "../App";

const Header = () => {
    const [Data, _Data] = useContext(FormContext)
    const [showTransaction, _showTransactionForm] = useState(false)
    const [totalAmount, _totaleAmount] = useState(0)
    useEffect(() => {
        const formvalue = localStorage.getItem('formData')
        const value = JSON.parse(formvalue)

        const totalincome = value?.users?.filter(x => x.types == 'income').reduce((m, n) => {
            return m + n.amount
        }, 0)
        const totalexpense = value?.users?.filter(x => x.types == 'expense').reduce((m, n) => {
            return m + n.amount
        }, 0)
        _totaleAmount(totalincome - totalexpense)
    }, [])

    return (
        <div className="headerMain">
            <div className="headerName">
                <img src={HeaderImg} style={{ width: 50 }} />
                <h1 >Expense Tracker</h1>
            </div>
            <div>
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="analysis">Analysis</Link>
            </div>
            <div>
                <Button
                    type="primary"
                    danger className="transactionsBtn"
                    onClick={() => _showTransactionForm(true)}
                >
                    Add Transactions
                </Button>
                <h1>Net amount : ${totalAmount}</h1>
            </div>

            {showTransaction ?
                <TransactionForm
                    onclose={() => _showTransactionForm(false)}
                />
                : null
            }
        </div>
    )
}
export default Header