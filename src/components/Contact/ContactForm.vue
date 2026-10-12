<template>
    <form class="panel flex flex-col gap-5 p-5 sm:p-7" novalidate @submit.prevent="handleSubmit">
        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label for="name" class="label">{{ t('contact_form.name') }}*</label>
                <input type="text" id="name" v-model="form.name" class="field" autocomplete="given-name" required />
                <p v-if="visibleErrors.name" class="error">{{ visibleErrors.name }}</p>
            </div>

            <div>
                <label for="lastname" class="label">{{ t('contact_form.lastname') }}*</label>
                <input type="text" id="lastname" v-model="form.lastname" class="field" autocomplete="family-name"
                    required />
                <p v-if="visibleErrors.lastname" class="error">{{ visibleErrors.lastname }}</p>
            </div>
        </div>

        <div>
            <label for="email" class="label">{{ t('contact_form.email') }}*</label>
            <input type="email" id="email" v-model="form.email" class="field" autocomplete="email" required />
            <p class="mt-1 text-xs text-ink-muted">{{ t('contact_form.email_disclaimer') }}</p>
            <p v-if="visibleErrors.email" class="error">{{ visibleErrors.email }}</p>
        </div>

        <div>
            <label for="subject" class="label">{{ t('contact_form.subject') }}*</label>
            <input type="text" id="subject" v-model="form.subject" class="field" required />
            <p v-if="visibleErrors.subject" class="error">{{ visibleErrors.subject }}</p>
        </div>

        <!-- User Type Selection -->
        <fieldset>
            <legend class="label">{{ t('contact_form.interest.title') }}*</legend>
            <div class="flex flex-wrap gap-2">
                <label v-for="option in interests" :key="option" class="cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors
                    has-focus-visible:outline-2 has-focus-visible:outline-accent"
                    :class="form.interest === option ? 'border-accent bg-accent/15 text-ink' : 'border-edge text-ink-muted hover:text-ink'">
                    <input type="radio" class="sr-only" :value="option" v-model="form.interest" name="interest" />
                    {{ t(`contact_form.interest.${option}`) }}
                </label>
            </div>
            <p v-if="visibleErrors.interest" class="error">{{ visibleErrors.interest }}</p>
        </fieldset>

        <!-- Conditional Fields -->
        <div v-if="form.interest === 'job'">
            <label for="company" class="label">{{ t('contact_form.company') }}*</label>
            <input type="text" id="company" v-model="form.company" class="field" autocomplete="organization"
                required />
            <p v-if="visibleErrors.company" class="error">{{ visibleErrors.company }}</p>
        </div>

        <div v-if="form.interest === 'project' || form.interest === 'other'">
            <label for="projectDescription" class="label">{{ t('contact_form.project_description') }}*</label>
            <textarea id="projectDescription" v-model="form.projectDescription" class="field" rows="3"
                required></textarea>
            <p v-if="visibleErrors.projectDescription" class="error">{{ visibleErrors.projectDescription }}</p>
        </div>

        <!-- User Message -->
        <div>
            <label for="message" class="label">{{ t('contact_form.message') }}*</label>
            <textarea id="message" v-model="form.message" class="field" rows="5" required></textarea>
            <p v-if="visibleErrors.message" class="error">{{ visibleErrors.message }}</p>
        </div>

        <div>
            <div ref="turnstileEl"></div>
            <p v-if="turnstileError" class="error">{{ turnstileError }}</p>
        </div>

        <p v-if="status === 'success'" class="flex items-center gap-2 rounded-lg bg-prompt/10 p-3 text-sm text-prompt"
            role="status">
            <Icon name="check" :size="16" />{{ t('contact_form.success_message') }}
        </p>
        <p v-if="status === 'error'" class="flex items-center gap-2 rounded-lg bg-danger/10 p-3 text-sm text-danger"
            role="alert">
            <Icon name="alert" :size="16" />{{ t('contact_form.errors.server') }}
        </p>

        <button type="submit" class="btn btn-primary self-start px-6 py-2.5" :disabled="isSubmitting">
            {{ isSubmitting ? t('contact_form.submitting') : t('contact_form.send') }}
            <Icon v-if="!isSubmitting" name="arrow-right" :size="16" />
        </button>
    </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import Icon from '@/components/shared/Icon.vue';

const { t } = useI18n();

const interests = ['job', 'project', 'other'];

const emptyForm = () => ({
    name: '',
    lastname: '',
    email: '',
    subject: '',
    interest: '',
    company: '',
    projectDescription: '',
    message: ''
});

const form = ref(emptyForm());

const isSubmitting = ref(false);
const submitted = ref(false);
const status = ref('');

const turnstileEl = ref(null);
const turnstileToken = ref('');
const turnstileError = ref('');

const errors = computed(() => {
    const newErrors = {};
    const f = form.value;

    if (!f.name) newErrors.name = t('contact_form.errors.required');
    if (!f.lastname) newErrors.lastname = t('contact_form.errors.required');

    if (!f.email) {
        newErrors.email = t('contact_form.errors.required');
    } else if (!/\S+@\S+\.\S+/.test(f.email)) {
        newErrors.email = t('contact_form.errors.invalid_email');
    }

    if (!f.subject) newErrors.subject = t('contact_form.errors.required');
    if (!f.interest) newErrors.interest = t('contact_form.errors.required');

    if (f.interest === 'job' && !f.company) {
        newErrors.company = t('contact_form.errors.required');
    }

    if ((f.interest === 'project' || f.interest === 'other') && !f.projectDescription) {
        newErrors.projectDescription = t('contact_form.errors.required');
    }

    if (!f.message) newErrors.message = t('contact_form.errors.required');

    return newErrors;
});

// Only show validation messages after the first submit attempt
const visibleErrors = computed(() => (submitted.value ? errors.value : {}));

const handleSubmit = async () => {
    submitted.value = true;
    status.value = '';

    if (Object.keys(errors.value).length) {
        return;
    }

    if (!turnstileToken.value) {
        turnstileError.value = t('contact_form.errors.turnstile_required');
        return;
    }

    isSubmitting.value = true;

    try {
        await axios.post(import.meta.env.VITE_SERVER_ADDRESS, form.value, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        status.value = 'success';
        form.value = emptyForm();
        submitted.value = false;
        turnstileToken.value = '';
        window.turnstile?.reset(turnstileEl.value);
    } catch (error) {
        console.error(error);
        status.value = 'error';
    } finally {
        isSubmitting.value = false;
    }
};

const renderTurnstile = () => {
    if (!window.turnstile || !turnstileEl.value) return;
    window.turnstile.render(turnstileEl.value, {
        sitekey: import.meta.env.VITE_SITE_DATA_KEY,
        theme: 'dark',
        callback: (token) => {
            turnstileToken.value = token;
            turnstileError.value = '';
        },
        'error-callback': () => {
            turnstileError.value = t('contact_form.errors.turnstile_error');
        }
    });
};

onMounted(() => {
    // Script persists across visits; only inject it once
    if (window.turnstile) {
        renderTurnstile();
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = renderTurnstile;
    document.head.appendChild(script);
});
</script>

<style scoped>
@reference "@/assets/styles/main.css";

.label {
    @apply mb-1.5 block text-sm font-medium text-ink;
}

.error {
    @apply mt-1 text-sm text-danger;
}
</style>
