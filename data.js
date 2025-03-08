const DataService = {
    STORAGE_KEY: 'jjs-aura-data',
    
    getStudents() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },
    
    saveStudents(students) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
    },
    
    addStudent(name) {
        const students = this.getStudents();
        if(!students.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            students.push({
                name,
                aura: 0,
                badges: [],
                history: []
            });
            this.saveStudents(students);
        }
    },
    
    updateStudent(originalName, updates) {
        const students = this.getStudents();
        const index = students.findIndex(s => s.name === originalName);
        if(index !== -1) {
            students[index] = {...students[index], ...updates};
            this.saveStudents(students);
        }
    },
    
    removeStudent(name) {
        let students = this.getStudents();
        students = students.filter(s => s.name !== name);
        this.saveStudents(students);
    }
};