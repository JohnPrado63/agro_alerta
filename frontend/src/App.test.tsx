import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Dashboard from './pages/Dashboard'

describe('Dashboard', () => {
  it('identifica claramente la información demostrativa', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    )

    expect(screen.getByText('DATOS DEMO / SIMULADOS')).toBeInTheDocument()
  })
})
