import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import EmailBody from './EmailBody';
import { getInboxSingleEmail, emailReadHandler } from '../../API/mail-api';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('../../API/mail-api', () => ({
    getInboxSingleEmail: jest.fn(),
    emailReadHandler: jest.fn(),
}));

describe('EmailBody', () => {
    const mockEmail = {
        from: 'test@example.com',
        timeStamp: '1625848800000',
        message: 'This is a test email.',
        isRead: false,
    };

    beforeEach(() => {
        useSelector.mockReturnValue('user@example.com');
    });

    afterEach(() => {
        useSelector.mockReset();
        getInboxSingleEmail.mockReset();
        emailReadHandler.mockReset();
    });

    test('displays email details correctly', async () => {
        getInboxSingleEmail.mockResolvedValue({ data: mockEmail });
        render(
            <MemoryRouter initialEntries={['/email/1']}>
                <Route path="/email/:id">
                    <EmailBody />
                </Route>
            </MemoryRouter>
        );

        expect(await screen.findByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('This is a test email.')).toBeInTheDocument();
    });

    test('marks email as read when clicked', async () => {
        getInboxSingleEmail.mockResolvedValue({ data: { ...mockEmail, isRead: false } });
        render(
            <MemoryRouter initialEntries={['/email/1']}>
                <Route path="/email/:id">
                    <EmailBody />
                </Route>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Email'));
        expect(emailReadHandler).toHaveBeenCalledTimes(1);
        expect(emailReadHandler).toHaveBeenCalledWith({
            email: 'user@example.com',
            id: '1',
            data: {
                to: 'user@example.com',
                from: 'test@example.com',
                message: 'This is a test email.',
                timeStamp: '1625848800000',
                isRead: true,
            },
        });
    });

    test('renders HTML content in email message', async () => {
        const htmlMessage = '<p>This is a <strong>test</strong> email.</p>';
        getInboxSingleEmail.mockResolvedValue({ data: { ...mockEmail, message: htmlMessage } });
        render(
            <MemoryRouter initialEntries={['/email/1']}>
                <Route path="/email/:id">
                    <EmailBody />
                </Route>
            </MemoryRouter>
        );

        expect(await screen.findByText('This is a test email.')).toBeInTheDocument();
        expect(screen.getByText('This is a')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('email.')).toBeInTheDocument();
        expect(screen.getByText('test')).toHaveStyle('font-weight: bold');
    });
});
