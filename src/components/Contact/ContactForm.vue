<template>
    <div class="bg-primary contact-form p-4 rounded">
        <form @submit.prevent="handleSubmit">

            <div class="form-group">
                <div class="mb-3">
                    <label for="name" class="form-label">{{ t('contact_form.name') }}*</label>
                    <input type="text" id="name" v-model="form.name" class="form-control" required />
                    <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
                </div>
            </div>

            <div class="mb-3">
                <label for="lastname" class="form-label">{{ t('contact_form.lastname') }}*</label>
                <input type="text" id="lastname" v-model="form.lastname" class="form-control" required />
                <span v-if="errors.lastname" class="text-danger">{{ errors.lastname }}</span>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">{{ t('contact_form.email') }}*</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required />
                <small class="form-text text-muted d-flex">{{ t('contact_form.email_disclaimer') }}</small>
                <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
            </div>

            <div class="mb-3">
                <label for="subject" class="form-label">{{ t('contact_form.subject') }}*</label>
                <input type="text" id="subject" v-model="form.subject" class="form-control" required />
                <span v-if="errors.subject" class="text-danger">{{ errors.subject }}</span>
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
                        <input class="form-check-input" type="radio" id="other" value="other" v-model="form.interest"
                            required />
                        <label class="form-check-label" for="other">{{ t('contact_form.interest.other') }}</label>
                    </div>
                </div>
                <span v-if="errors.interest" class="text-danger">{{ errors.interest }}</span>
            </div>

            <!-- Conditional Fields -->
            <div class="mb-3" v-if="form.interest === 'job'">
                <label for="company" class="form-label">{{ t('contact_form.company') }}*</label>
                <input type="text" id="company" v-model="form.company" class="form-control" required />
                <span v-if="errors.company" class="text-danger">{{ errors.company }}</span>
            </div>

            <div class="mb-3" v-if="form.interest === 'project' || form.interest === 'other'">
                <label for="projectDescription" class="form-label">{{ t('contact_form.project_description') }}*</label>
                <textarea id="projectDescription" v-model="form.projectDescription" class="form-control" rows="4"
                    required></textarea>
                <span v-if="errors.projectDescription" class="text-danger">{{ errors.projectDescription }}</span>
            </div>

            <!-- User Message -->
            <div class="mb-3">
                <label for="message" class="form-label">{{ t('contact_form.message') }}*</label>
                <textarea id="message" v-model="form.message" class="form-control" rows="5" required></textarea>
                <span v-if="errors.message" class="text-danger">{{ errors.message }}</span>
            </div>

            <div class="mb-3">
                <div class="cf-turnstile" data-sitekey="{{ import.meta.env.VITE_SITE_DATA_KEY }}"></div>
                <span v-if="errors.turnstile" class="text-danger">{{ errors.turnstile }}</span>
            </div>

            <!-- Submit Button -->
            <div class="d-flex justify-content-center align-items-center">
                <button type="submit" class="btn btn-primary bg-dark rounded-pill py-3"
                    :disabled="!isFormValid || isSubmitting">
                    {{ isSubmitting ? t('contact_form.submitting') : t('contact_form.send') }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const { t } = useI18n();

const form = ref({
    name: '',
    lastname: '',
    email: '',
    subject: '',
    interest: '',
    company: '',
    projectDescription: '',
    message: ''
});

const errors = ref({});
const isSubmitting = ref(false);

const turnstileToken = ref('');

const validateForm = () => {
    const newErrors = {};

    if (!form.value.name) {
        newErrors.name = t('contact_form.errors.required');
    }

    if (!form.value.lastname) {
        newErrors.lastname = t('contact_form.errors.required');
    }

    if (!form.value.email) {
        newErrors.email = t('contact_form.errors.required');
    } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
        newErrors.email = t('contact_form.errors.invalid_email');
    }

    if (!form.value.subject) {
        newErrors.subject = t('contact_form.errors.required');
    }

    if (!form.value.interest) {
        newErrors.interest = t('contact_form.errors.required');
    }

    if (form.value.interest === 'job' && !form.value.company) {
        newErrors.company = t('contact_form.errors.required');
    }

    if ((form.value.interest === 'project' || form.value.interest === 'other') && !form.value.projectDescription) {
        newErrors.projectDescription = t('contact_form.errors.required');
    }

    if (!form.value.message) {
        newErrors.message = t('contact_form.errors.required');
    }

    errors.value = newErrors;

    return Object.keys(newErrors).length === 0;
};

const isFormValid = computed(() => {
    return validateForm();
});

const handleSubmit = async () => {
    if (!validateForm()) {
        console.log(t('contact_form.errors.form_invalid'));
        return;
    }

    if (!turnstileToken.value) {
        errors.value.turnstile = t('contact_form.errors.turnstile_required');
        return;
    }

    isSubmitting.value = true;

    try {
        await axios.post(import.meta.env.VITE_SERVER_ADDRESS, form.value, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert(t('contact_form.success_message'));

        form.value = {
            name: '',
            lastname: '',
            email: '',
            subject: '',
            interest: '',
            company: '',
            projectDescription: '',
            message: ''
        };
        errors.value = {};
        turnstileToken.value = '';
    } catch (error) {
        console.log(t('contact_form.errors.server'));
    } finally {
        isSubmitting.value = false;
    }
};

// Load Turnstile Script and Initialize Widget
const loadTurnstile = () => {
    if (window.turnstile) {
        window.turnstile.render('.cf-turnstile', {
            sitekey: import.meta.env.VITE_SITE_DATA_KEY,
            callback: (token) => {
                turnstileToken.value = token;
                errors.value.turnstile = '';
            },
            'error-callback': () => {
                errors.value.turnstile = t('contact_form.errors.turnstile_error');
            }
        });
    }
};

onMounted(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = loadTurnstile;
    document.head.appendChild(script);
});
</script>

<style scoped>
.contact-form {
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

.text-danger {
    color: #dc3545;
    font-size: 0.875em;
}

.contact-form button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>