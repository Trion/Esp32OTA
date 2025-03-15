**Firmware Update JSON Documentation**

This document explains the structure and usage of the `firmware.json` file used for OTA (Over-the-Air) updates on an ESP32 device.

### **File Structure**

The `firmware.json` file contains essential metadata for the firmware update process:

```json
{
  "version": "1.1.0",
  "published": true,
  "file": "https://your-update-server.com/firmware.bin"
}
```

### **Fields Explained**

- **`version`** (string): The latest firmware version available for update.
- **`published`** (boolean): Indicates whether the update is available for devices.
  - `true` - The update is live and can be downloaded.
  - `false` - No update available, even if a new version exists.
- **`file`** (string): The direct URL to the firmware binary file to be downloaded and installed.

### **Usage in OTA Process**

1. The ESP32 device checks this file periodically or on request.
2. It compares the `version` field with its current firmware version.
3. If an update is available (`published` is `true` and `version` is newer than the current version), the device downloads the firmware from the `file` URL.
4. The firmware update process starts, and upon success, the device reboots with the new firmware.

### **Hosting Considerations**

- Ensure the `firmware.json` file is accessible via a public URL.
- The firmware binary (`.bin`) file should be hosted on a reliable server with proper MIME types set for binary files.
- Use HTTPS for security.

### **Example Update Process Flow**

1. ESP32 requests `firmware.json`.
2. JSON response:
   ```json
   {
     "version": "1.2.0",
     "published": true,
     "file": "https://your-update-server.com/firmware_v1.2.0.bin"
   }
   ```
3. Device downloads and installs `firmware_v1.2.0.bin`.
4. Device reboots and runs the new firmware.

### **Troubleshooting**

- Ensure the JSON file is correctly formatted and accessible.
- Verify the firmware file is correctly hosted and accessible.
- Check ESP32 logs for update status and errors.

### **Security Considerations**

- Implement authentication or secure signing mechanisms to prevent unauthorized updates.
- Validate the firmware integrity using SHA-256 hashes before applying the update.

---

Author : Sir Thiha Kyaw,NCK