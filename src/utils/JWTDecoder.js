export function decodeJwt(token) {
    if (!token) {
        return null;
    }

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64URL to Base64
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
                .join('')
        );

        const decoded = JSON.parse(jsonPayload);

        // Map the full role URL to a simple "role" key
        if (decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
            decoded.role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            delete decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Clean up the old key
        }

        if (decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']) {
            decoded.name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
            delete decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        }

        return decoded;
    } catch (error) {
        console.error('Failed to decode JWT:', error.message);
        return null;
    }
}
