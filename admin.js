function handleLogin() {
    const password = document.getElementById('adminPassword').value;
    if(password === 'Himal@2066') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        populateStudentSelects();
    } else {
        alert('Wrong password!');
    }
}

function populateStudentSelects() {
    const students = DataService.getStudents();
    const selects = document.querySelectorAll('.student-select');
    
    selects.forEach(select => {
        select.innerHTML = '<option value="">Select Student</option>';
        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.name;
            option.textContent = student.name;
            select.appendChild(option);
        });
    });
}

function handleBulkAdd() {
    const names = document.getElementById('bulkNames').value
        .split(/[\n,]+/)
        .map(name => name.trim())
        .filter(name => name);
    
    names.forEach(name => DataService.addStudent(name));
    alert(`${names.length} students added!`);
    populateStudentSelects();
    document.getElementById('bulkNames').value = '';
}

function handleAuraChange() {
    const studentName = document.getElementById('targetStudent').value;
    const operation = document.getElementById('auraOperation').value;
    const value = parseInt(document.getElementById('auraValue').value);
    
    const student = DataService.getStudents().find(s => s.name === studentName);
    if(!student) return;

    let newAura = student.aura;
    switch(operation) {
        case 'set': newAura = value; break;
        case 'add': newAura += value; break;
        case 'subtract': newAura = Math.max(0, student.aura - value); break;
    }

    DataService.updateStudent(studentName, {
        aura: newAura,
        history: [...student.history, { 
            date: new Date().toISOString(), 
            aura: newAura 
        }]
    });
    
    alert('Aura updated!');
    document.getElementById('auraValue').value = '';
}

function handleAddBadge() {
    const studentName = document.getElementById('badgeStudent').value;
    const badge = document.getElementById('badgeInput').value;
    
    const student = DataService.getStudents().find(s => s.name === studentName);
    if(student) {
        DataService.updateStudent(studentName, {
            badges: [...student.badges, badge]
        });
        alert('Badge added!');
    }
}

function handleRemoveBadge() {
    const studentName = document.getElementById('badgeStudent').value;
    const student = DataService.getStudents().find(s => s.name === studentName);
    if(student && student.badges.length > 0) {
        DataService.updateStudent(studentName, {
            badges: student.badges.slice(0, -1)
        });
        alert('Last badge removed!');
    }
}

function handleRemoveStudent() {
    const studentName = document.getElementById('studentSelect').value;
    if(confirm(`Are you sure you want to remove ${studentName}?`)) {
        DataService.removeStudent(studentName);
        populateStudentSelects();
        alert('Student removed!');
    }
}

// Initialize admin page
populateStudentSelects();
