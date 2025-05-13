import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Import the xlsx library

function TransactionForm() {
    const [formData, setFormData] = useState({
        particulars: "",
        opening: "",
        receipt: "",
        issued: "",
        balance: "",
        date: "",
        signed_by: "",
        remarks: "",
    });

    const [user, setUser] = useState(null); // State to store user info
    const [transactions, setTransactions] = useState([]); // Store all transaction data

    useEffect(() => {
        // Fetch user info
        axios.get("http://localhost:8000/api/user-info/")
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data", error);
            });

        // Fetch all transactions data
        axios.get("http://localhost:8000/api/transactions/")
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error("Error fetching transactions", error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/transactions/", formData);
            setTransactions([...transactions, response.data]); // Add the new transaction to the list
            alert("Data saved successfully!");
        } catch (error) {
            alert("Error saving data.");
        }
    };

    const handleDownloadExcel = () => {
        // Get the current date and time
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        const formattedTime = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // Get time in HH-MM-SS format
    
        // Create the filename with the date and time
        const filename = `transaction_data_${formattedDate}_${formattedTime}.xlsx`;
    
        const ws = XLSX.utils.json_to_sheet(transactions); // Use all transactions data
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transaction Data");
        XLSX.writeFile(wb, filename); // Save the file with the dynamic filename
    };
    

    const handleLogout = () => {
        // Clear local storage and redirect to login page
        localStorage.removeItem("access_token");
        window.location.href = "/login"; // Redirect to login page after logout
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Clear form data
    const handleClear = () => {
        setFormData({
            particulars: "",
            opening: "",
            receipt: "",
            issued: "",
            balance: "",
            date: "",
            signed_by: "",
            remarks: "",
        });
    };



    const containerStyle = {
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        padding: "7em",
        display: "flex",
        justifyContent: "center",
        backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/035/941/144/small_2x/ai-generated-inventory-goods-warehouse-background-photo.jpg')", // Add your image URL here
        backgroundSize: "cover", // Ensures the image covers the entire container
        backgroundPosition: "center", // Keeps the image centered
        backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat
    };
    

    const cardStyle = {
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "900px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    };

    const userInfoStyle = {
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        marginBottom: "20px",
        textAlign: "center",
    };

    const headerStyle = {
        fontSize: "28px",
        fontWeight: "700",
        color: "#333",
        marginBottom: "20px",
        textAlign: "center",
    };

    const inputStyle = {
        padding: "12px",
        fontSize: "16px",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "10px",
        transition: "border 0.3s ease",
    };

    const textareaStyle = {
        ...inputStyle,
        resize: "vertical",
        height: "100px",
    };

    const buttonStyle = {
        padding: "12px 18px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "8px",
        width: "48%",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        marginRight: "10px",
    };

    const successButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        marginRight: "10px",
    };

    const clearButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
    };

    const logoutButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#e91e63",
        color: "#fff",
        border: "none",
        width: "100%",
        marginTop: "20px",
    };

    const formRowStyle = {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "15px",
    };

    const formColumnStyle = {
        marginBottom: "15px",
        flex: "1",
        minWidth: "220px",
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={headerStyle}>Inventory Form</h2>
                <form onSubmit={handleSubmit} className={{mt: '4'}}>
                    <div style={formRowStyle}>
                        <div style={formColumnStyle}>
                            <input
                                name="particulars"
                                style={inputStyle}
                                placeholder="Particulars"
                                onChange={handleChange}
                                value={formData.particulars}
                                required
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <input
                                name="opening"
                                type="number"
                                style={inputStyle}
                                placeholder="Opening"
                                onChange={handleChange}
                                value={formData.opening}
                                required
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <input
                                name="receipt"
                                type="number"
                                style={inputStyle}
                                placeholder="Receipt"
                                onChange={handleChange}
                                value={formData.receipt}
                                required
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <input
                                name="issued"
                                type="number"
                                style={inputStyle}
                                placeholder="Issued"
                                onChange={handleChange}
                                value={formData.issued}
                                required
                            />
                        </div>
                    </div>

                    <div style={formRowStyle}>
                        <div style={formColumnStyle}>
                            <input
                                name="balance"
                                type="number"
                                style={inputStyle}
                                placeholder="Balance"
                                onChange={handleChange}
                                value={formData.balance}
                                required
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <input
                                name="date"
                                type="date"
                                style={inputStyle}
                                placeholder="Date"
                                onChange={handleChange}
                                value={formData.date}
                                required
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <input
                                name="signed_by"
                                style={inputStyle}
                                placeholder="Signed By"
                                onChange={handleChange}
                                value={formData.signed_by}
                                required
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <textarea
                                name="remarks"
                                style={textareaStyle}
                                placeholder="Remarks"
                                onChange={handleChange}
                                value={formData.remarks}
                            ></textarea>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="submit" style={primaryButtonStyle}>
                            Save Data
                        </button>
                        <button
                            type="button"
                            style={successButtonStyle}
                            onClick={handleDownloadExcel}
                        >
                            Download All Data as Excel
                        </button>
                        <button
                            type="button"
                            style={clearButtonStyle}
                            onClick={handleClear}
                        >
                            Clear Data
                        </button>
                    </div>
                </form>
                <button style={logoutButtonStyle} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default TransactionForm;
