<template>
    <div class="bg-primary contact-form p-4 rounded">
        <form @submit.prevent="handleSubmit">

            <div class="form-group">
                <div class="mb-3">
                    <label for="name" class="form-label">{{ t('contact_form.name') }}*</label>
                    <input type="text" id="name" v-model="form.name" class="form-control" required />
                </div>
            </div>

            <div class="mb-3">
                <label for="lastname" class="form-label">{{ t('contact_form.lastname') }}*</label>
                <input type="text" id="lastname" v-model="form.lastname" class="form-control" required />

            </div>

            <div class="mb-3">
                <label for="email" class="form-label">{{ t('contact_form.email') }}*</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required />
                <small class="form-text text-muted">{{ t('contact_form.email_disclaimer') }}</small>
            </div>

            <div class="mb-3">
                <label for="subject" class="form-label">{{ t('contact_form.subject') }}*</label>
                <input type="text" id="subject" v-model="form.subject" class="form-control" required />
            </div>

            <!-- User Type Selection -->
            <div class="mb-3">
                <label class="form-label">{{ t('contact_form.interest.title') }}*</label>
                <div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="recruiter" value="job" v-model="form.interest"
                            required />
                        <label class="form-check-label" for="recruiter">{{ t('contact_form.interest.job') }}</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="project" value="project"
                            v-model="form.interest" required />
                        <label class="form-check-label" for="project">{{ t('contact_form.interest.project') }}</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="project" value="other" v-model="form.interest"
                            required />
                        <label class="form-check-label" for="project">{{ t('contact_form.interest.other') }}</label>
                    </div>
                </div>
            </div>

            <!-- Conditional Fields -->
            <div class="mb-3" v-if="form.interest === 'job'">
                <label for="company" class="form-label">{{ t('contact_form.company') }}*</label>
                <input type="text" id="company" v-model="form.company" class="form-control" required />
            </div>

            <div class="mb-3" v-if="form.interest === 'project' || form.interest === 'other'">
                <label for="projectDescription" class="form-label">{{ t('contact_form.project_description') }}*</label>
                <textarea id="projectDescription" v-model="form.projectDescription" class="form-control" rows="4"
                    required></textarea>
            </div>

            <!-- User Message -->
            <div class="mb-3">
                <label for="message" class="form-label">{{ t('contact_form.message') }}*</label>
                <textarea id="message" v-model="form.message" class="form-control" rows="5" required></textarea>
            </div>

            <!-- Submit Button -->
            <div class="d-flex justify-content-center align-items-center">
                <button type="submit" class="btn btn-primary bg-dark rounded-pill py-3">{{ t('contact_form.send')
                    }}</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = ref({
    name: '',
    lastname: '',
    email: '',
    country: '',
    subject: '',
    userType: '',
    company: '',
    projectDescription: '',
    message: ''
});

const handleSubmit = () => {
    // Implement form submission logic (e.g., send data to API)
    console.log('Form Submitted:', form.value);
    alert(t('contact_form.success_message'));
    // Reset form
    form.value = {
        name: '',
        lastname: '',
        email: '',
        country: '',
        subject: '',
        userType: '',
        company: '',
        projectDescription: '',
        message: ''
    };
};
</script>

<style scoped>
.contact-form {
    width: 45%;
    max-width: 650px;
    color: #fff;
    font-size: 1.25rem;
}

small {
    color: rgb(170, 196, 230) !important;
}

.form-label {
    color: #fff;
}

.btn-primary {
    font-weight: bold;
    background: none;
    color: rgb(145, 145, 145);
    border: none;
    min-width: 100px;
}

.btn-primary:hover {
    color: white;
}
</style>